package com.archflow.security;

import com.archflow.model.ProjectMember;
import com.archflow.model.Role;
import com.archflow.model.User;
import com.archflow.repository.ProjectMemberRepository;
import com.archflow.repository.UserRepository;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.UUID;

/**
 * Aspect que intercepta métodos anotados com @RequiresRole e valida
 * se o usuário autenticado possui a role necessária no projeto.
 */
@Aspect
@Component
public class ProjectRoleAspect {

    private static final Logger logger = LoggerFactory.getLogger(ProjectRoleAspect.class);

    @Autowired
    private ProjectMemberRepository projectMemberRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Intercepta todos os métodos anotados com @RequiresRole.
     * Valida se o usuário tem permissão suficiente no projeto antes de executar o
     * método.
     */
    @Around("@annotation(requiresRole)")
    public Object checkProjectRole(ProceedingJoinPoint joinPoint, RequiresRole requiresRole) throws Throwable {

        // 1. Obter o usuário autenticado
        User currentUser = getAuthenticatedUser();

        // 2. Extrair o projectId dos parâmetros do método
        UUID projectId = extractProjectId(joinPoint, requiresRole.projectIdParam());

        // 3. Verificar se o usuário é membro do projeto
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, currentUser.getId())
                .orElseThrow(() -> {
                    logger.warn("User {} is not a member of project {}", currentUser.getEmail(), projectId);
                    return new AccessDeniedException("Você não é membro deste projeto");
                });

        // 4. Validar se a role do usuário tem permissão suficiente
        Role requiredRole = requiresRole.value();
        if (!member.getRole().hasPermission(requiredRole)) {
            logger.warn("User {} with role {} tried to access endpoint requiring {} in project {}",
                    currentUser.getEmail(), member.getRole(), requiredRole, projectId);
            throw new AccessDeniedException(
                    String.format("Permissão insuficiente. Necessário: %s, Atual: %s",
                            requiredRole, member.getRole()));
        }

        logger.debug("User {} with role {} authorized for action requiring {} in project {}",
                currentUser.getEmail(), member.getRole(), requiredRole, projectId);

        // 5. Permitir a execução do método
        return joinPoint.proceed();
    }

    /**
     * Extrai o projectId dos parâmetros do método usando o nome do parâmetro.
     */
    private UUID extractProjectId(ProceedingJoinPoint joinPoint, String paramName) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        Parameter[] parameters = method.getParameters();
        Object[] args = joinPoint.getArgs();

        for (int i = 0; i < parameters.length; i++) {
            if (parameters[i].getName().equals(paramName)) {
                Object value = args[i];
                if (value instanceof UUID) {
                    return (UUID) value;
                } else if (value instanceof String) {
                    return UUID.fromString((String) value);
                }
            }
        }

        throw new IllegalArgumentException(
                String.format("Parâmetro '%s' não encontrado no método %s", paramName, method.getName()));
    }

    /**
     * Obtém o usuário autenticado do contexto de segurança.
     */
    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Usuário não autenticado");
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado no banco de dados"));
    }
}
