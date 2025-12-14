package com.archflow.aspect;

import com.archflow.model.AuditLog;
import com.archflow.model.User;
import com.archflow.repository.AuditLogRepository;
import com.archflow.service.IAuthenticationContext;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.UUID;

@Aspect
@Component
public class AuditLogAspect {

    private static final Logger logger = LoggerFactory.getLogger(AuditLogAspect.class);

    private final AuditLogRepository auditLogRepository;
    private final IAuthenticationContext authenticationContext;
    private final ObjectMapper objectMapper;

    public AuditLogAspect(AuditLogRepository auditLogRepository, IAuthenticationContext authenticationContext,
            ObjectMapper objectMapper) {
        this.auditLogRepository = auditLogRepository;
        this.authenticationContext = authenticationContext;
        this.objectMapper = objectMapper;
    }

    // Pointcut para métodos que modificam estado (POST, PUT, PATCH, DELETE) nos
    // Controllers API
    // Exclui AuthController e métodos de leitura (GET) implicitamente pelo nome ou
    // anotação se fosse mais específico
    // Aqui vamos focar em métodos "create", "update", "delete", "save" ou
    // mapeamentos específicos
    @Pointcut("execution(* com.archflow.controller.*.*(..)) && " +
            "(@annotation(org.springframework.web.bind.annotation.PostMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.PutMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.PatchMapping) || " +
            "@annotation(org.springframework.web.bind.annotation.DeleteMapping))")
    public void modificationRestMethods() {
    }

    @AfterReturning(pointcut = "modificationRestMethods()", returning = "result")
    public void logAudit(JoinPoint joinPoint, Object result) {
        try {
            if (!authenticationContext.isAuthenticated()) {
                return; // Não audita ações anônimas (ex: login/register)
            }

            User currentUser = authenticationContext.getCurrentUser();
            String methodName = joinPoint.getSignature().getName();
            String className = joinPoint.getSignature().getDeclaringType().getSimpleName();

            // Determina operação baseada no nome do método ou anotação (simplificado)
            AuditLog.Operation operation = determineOperation(methodName);

            // Tenta pegar IP e User Agent
            String ipAddress = "unknown";
            String userAgent = "unknown";
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                ipAddress = request.getRemoteAddr();
                userAgent = request.getHeader("User-Agent");
            }

            // Serializa argumentos e retorno (Cuidado com senhas/dados sensíveis em prod!)
            // Em um cenário real, filtraríamos campos sensíveis
            String newData = serializeSafely(result);
            Object[] args = joinPoint.getArgs();
            String oldData = (args.length > 0) ? serializeSafely(args[0]) : "{}"; // Assume primeiro arg é o DTO de
                                                                                  // request

            // Tenta extrair Project ID se possível (ex: dos argumentos)
            UUID projectId = extractProjectId(args);

            AuditLog log = new AuditLog(
                    currentUser.getId(),
                    className, // Usamos o nome do Controller como "Tabela" lógica por enquanto
                    operation,
                    oldData,
                    newData,
                    ipAddress,
                    userAgent,
                    projectId);

            auditLogRepository.save(log);

        } catch (Exception e) {
            logger.error("Falha ao registrar log de auditoria", e);
            // Não relança exceção para não interromper fluxo de negócio
        }
    }

    private AuditLog.Operation determineOperation(String methodName) {
        String lower = methodName.toLowerCase();
        if (lower.contains("create") || lower.contains("post") || lower.contains("add"))
            return AuditLog.Operation.CREATE;
        if (lower.contains("update") || lower.contains("put") || lower.contains("patch") || lower.contains("edit"))
            return AuditLog.Operation.UPDATE;
        if (lower.contains("delete") || lower.contains("remove"))
            return AuditLog.Operation.DELETE;
        return AuditLog.Operation.UPDATE; // Default fallback
    }

    private String serializeSafely(Object object) {
        try {
            if (object == null)
                return "null";
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            return "{\"error\": \"serialization_failed\"}";
        }
    }

    private UUID extractProjectId(Object[] args) {
        // Implementação simplificada: procura pelo primeiro UUID nos argumentos que
        // possa ser um ProjectID (difícil saber sem contexto)
        // Ou procura em campos de DTOs conhecidos
        // Para simplificar, deixaremos null por enquanto ou tentaríamos fazer
        // reflection em campos 'projectId'
        try {
            for (Object arg : args) {
                if (arg instanceof UUID) {
                    // Heurística fraca, mas serve como placeholder. Idealmente inspecionar DTOs.
                    // return (UUID) arg;
                }
                // Tentar ler campo getProjectId() via reflection nos DTOs
                try {
                    java.lang.reflect.Method method = arg.getClass().getMethod("getProjectId");
                    Object id = method.invoke(arg);
                    if (id instanceof UUID)
                        return (UUID) id;
                } catch (Exception ignored) {
                }
            }
        } catch (Exception e) {
            // ignore
        }
        return null;
    }
}
