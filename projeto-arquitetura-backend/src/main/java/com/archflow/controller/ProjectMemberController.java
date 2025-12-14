package com.archflow.controller;

import com.archflow.dto.member.AddMemberRequest;
import com.archflow.dto.member.MemberResponseDTO;
import com.archflow.model.Role;
import com.archflow.security.RequiresRole;
import com.archflow.service.ProjectMemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Controller para gerenciamento de membros de projetos.
 * Endpoints protegidos por autenticação JWT.
 */
@RestController
@RequestMapping("/api/v1/projects")
public class ProjectMemberController {

    @Autowired
    private ProjectMemberService projectMemberService;

    /**
     * Adiciona um novo membro ao projeto.
     * Requer role PROJECT_OWNER ou superior.
     * 
     * @param projectId ID do projeto
     * @param request   Dados do membro (email, role, permissões)
     * @return Dados do membro adicionado
     */
    @RequiresRole(Role.PROJECT_OWNER)
    @PostMapping("/{projectId}/members")
    public ResponseEntity<MemberResponseDTO> addMember(
            @PathVariable @NonNull UUID projectId,
            @RequestBody @Valid @NonNull AddMemberRequest request) {
        try {
            MemberResponseDTO member = projectMemberService.addMemberWithoutCheck(projectId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(member);
        } catch (RuntimeException e) {
            // User not found, project not found, already member
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Lista todos os membros de um projeto.
     * 
     * @param projectId ID do projeto
     * @return Lista de membros
     */
    @GetMapping("/{projectId}/members")
    public ResponseEntity<List<MemberResponseDTO>> getMembers(
            @PathVariable @NonNull UUID projectId) {
        List<MemberResponseDTO> members = projectMemberService.getProjectMembers(projectId);
        return ResponseEntity.ok(members);
    }

    /**
     * Obtém as permissões de um membro específico no projeto.
     * 
     * @param projectId ID do projeto
     * @param userId    ID do usuário
     * @return Mapa de permissões JSONB
     */
    @GetMapping("/{projectId}/members/{userId}/permissions")
    public ResponseEntity<Map<String, Object>> getMemberPermissions(
            @PathVariable @NonNull UUID projectId,
            @PathVariable @NonNull UUID userId) {
        try {
            Map<String, Object> permissions = projectMemberService.getPermissions(projectId, userId);
            return ResponseEntity.ok(permissions);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Remove um membro do projeto.
     * Requer role PROJECT_OWNER ou superior.
     * 
     * @param projectId ID do projeto
     * @param memberId  ID da associação membro-projeto
     * @return 204 No Content
     */
    @RequiresRole(Role.PROJECT_OWNER)
    @DeleteMapping("/{projectId}/members/{memberId}")
    public ResponseEntity<Void> removeMember(
            @PathVariable @NonNull UUID projectId,
            @PathVariable @NonNull UUID memberId) {
        projectMemberService.removeMemberWithoutCheck(projectId, memberId);
        return ResponseEntity.noContent().build();
    }
}
