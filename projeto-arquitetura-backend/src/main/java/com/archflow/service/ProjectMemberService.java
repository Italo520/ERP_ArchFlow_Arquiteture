package com.archflow.service;

import com.archflow.dto.member.AddMemberRequest;
import com.archflow.dto.member.MemberResponseDTO;
import com.archflow.mapper.ProjectMemberMapper;
import com.archflow.model.Project;
import com.archflow.model.ProjectMember;
import com.archflow.model.Role;
import com.archflow.model.User;
import com.archflow.repository.ProjectMemberRepository;
import com.archflow.repository.ProjectRepository;
import com.archflow.repository.UserRepository;

import org.springframework.lang.NonNull;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Serviço de gerenciamento de membros de projetos.
 * Refatorado para seguir SOLID:
 * - SRP: Foco em operações de membership (sem mapeamento)
 * - DIP: Usa IAuthenticationContext e ProjectMemberMapper (abstrações)
 */
@Service
public class ProjectMemberService {

    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final IAuthenticationContext authenticationContext;
    private final ProjectMemberMapper projectMemberMapper;

    public ProjectMemberService(
            ProjectMemberRepository projectMemberRepository,
            ProjectRepository projectRepository,
            UserRepository userRepository,
            IAuthenticationContext authenticationContext,
            ProjectMemberMapper projectMemberMapper) {
        this.projectMemberRepository = projectMemberRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.authenticationContext = authenticationContext;
        this.projectMemberMapper = projectMemberMapper;
    }

    public MemberResponseDTO addMember(@NonNull UUID projectId, @NonNull AddMemberRequest request) {
        checkPermission(projectId, Role.PROJECT_OWNER);
        return addMemberWithoutCheck(projectId, request);
    }

    public MemberResponseDTO addMemberWithoutCheck(@NonNull UUID projectId, @NonNull AddMemberRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));

        // Check availability
        Optional<ProjectMember> existing = projectMemberRepository.findByProjectIdAndUserId(projectId, user.getId());
        if (existing.isPresent()) {
            throw new RuntimeException("User is already a member of this project");
        }

        ProjectMember member = new ProjectMember();
        member.setProject(project);
        member.setUser(user);
        member.setRole(request.getRole());
        member.setPermissoes(request.getPermissoes());

        ProjectMember saved = projectMemberRepository.save(member);
        return projectMemberMapper.toDTO(saved);
    }

    public void removeMember(@NonNull UUID projectId, @NonNull UUID memberId) {
        checkPermission(projectId, Role.PROJECT_OWNER);
        removeMemberWithoutCheck(projectId, memberId);
    }

    public void removeMemberWithoutCheck(@NonNull UUID projectId, @NonNull UUID memberId) {
        projectMemberRepository.deleteById(memberId);
    }

    public List<MemberResponseDTO> getProjectMembers(@NonNull UUID projectId) {
        return projectMemberRepository.findByProjectId(projectId).stream()
                .map(projectMemberMapper::toDTO)
                .collect(Collectors.toList());
    }

    public java.util.Map<String, Object> getPermissions(@NonNull UUID projectId, @NonNull UUID userId) {
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, userId)
                .orElseThrow(() -> new RuntimeException("Member not found in project"));
        return member.getPermissoes();
    }

    public void addProjectCreatorAsOwner(Project project, User creator) {
        ProjectMember member = new ProjectMember();
        member.setProject(project);
        member.setUser(creator);
        member.setRole(Role.PROJECT_OWNER);
        projectMemberRepository.save(member);
    }

    private void checkPermission(UUID projectId, Role requiredRole) {
        User currentUser = authenticationContext.getCurrentUser();

        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, currentUser.getId())
                .orElseThrow(() -> new AccessDeniedException("User is not a member of this project"));

        if (!member.getRole().hasPermission(requiredRole)) {
            throw new AccessDeniedException("Insufficient permissions. Required: " + requiredRole);
        }
    }
}
