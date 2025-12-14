package com.archflow.security;

import com.archflow.model.Project;
import com.archflow.model.ProjectMember;
import com.archflow.model.Role;
import com.archflow.model.User;
import com.archflow.repository.ProjectMemberRepository;
import com.archflow.repository.ProjectRepository;
import com.archflow.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Testes de integração para verificar o funcionamento do ProjectRoleAspect.
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
class ProjectRoleAspectTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMemberRepository projectMemberRepository;

    @Autowired
    private TestProjectService testProjectService;

    private User adminUser;
    private User managerUser;
    private User viewerUser;
    private Project testProject;

    @BeforeEach
    void setUp() {
        // Criar usuários de teste
        adminUser = new User();
        adminUser.setEmail("admin@test.com");
        adminUser.setPassword("hash");
        adminUser.setFullName("Admin User");
        adminUser = Objects.requireNonNull(userRepository.save(adminUser));

        managerUser = new User();
        managerUser.setEmail("manager@test.com");
        managerUser.setPassword("hash");
        managerUser.setFullName("Manager User");
        managerUser = Objects.requireNonNull(userRepository.save(managerUser));

        viewerUser = new User();
        viewerUser.setEmail("viewer@test.com");
        viewerUser.setPassword("hash");
        viewerUser.setFullName("Viewer User");
        viewerUser = Objects.requireNonNull(userRepository.save(viewerUser));

        // Criar projeto de teste
        testProject = new Project();
        testProject.setName("Test Project");
        testProject.setOwner(adminUser);
        testProject = projectRepository.save(testProject);

        // Adicionar membros com diferentes roles
        ProjectMember adminMember = new ProjectMember();
        adminMember.setProject(testProject);
        adminMember.setUser(adminUser);
        adminMember.setRole(Role.PROJECT_OWNER);
        projectMemberRepository.save(adminMember);

        ProjectMember managerMember = new ProjectMember();
        managerMember.setProject(testProject);
        managerMember.setUser(managerUser);
        managerMember.setRole(Role.MANAGER);
        projectMemberRepository.save(managerMember);

        ProjectMember viewerMember = new ProjectMember();
        viewerMember.setProject(testProject);
        viewerMember.setUser(viewerUser);
        viewerMember.setRole(Role.VIEWER);
        projectMemberRepository.save(viewerMember);
    }

    @Test
    void testProjectOwnerCanManageMembers() {
        // Autenticar como PROJECT_OWNER
        authenticateAs(adminUser);

        // Deve permitir ação que requer PROJECT_OWNER
        assertDoesNotThrow(() -> {
            testProjectService.manageMembersAction(testProject.getId());
        });
    }

    @Test
    void testManagerCannotManageMembers() {
        // Autenticar como MANAGER
        authenticateAs(managerUser);

        // Não deve permitir ação que requer PROJECT_OWNER
        assertThrows(AccessDeniedException.class, () -> {
            testProjectService.manageMembersAction(testProject.getId());
        });
    }

    @Test
    void testViewerCannotManageMembers() {
        // Autenticar como VIEWER
        authenticateAs(viewerUser);

        // Não deve permitir ação que requer PROJECT_OWNER
        assertThrows(AccessDeniedException.class, () -> {
            testProjectService.manageMembersAction(testProject.getId());
        });
    }

    @Test
    void testViewerCanViewProject() {
        // Autenticar como VIEWER
        authenticateAs(viewerUser);

        // Deve permitir ação que requer apenas VIEWER
        assertDoesNotThrow(() -> {
            testProjectService.viewProjectAction(testProject.getId());
        });
    }

    @Test
    void testNonMemberCannotAccessProject() {
        // Criar usuário que não é membro do projeto
        User outsider = new User();
        outsider.setEmail("outsider@test.com");
        outsider.setPassword("hash");
        outsider.setFullName("Outsider");
        outsider = userRepository.save(outsider);

        authenticateAs(outsider);

        // Não deve permitir acesso ao projeto
        assertThrows(AccessDeniedException.class, () -> {
            testProjectService.viewProjectAction(testProject.getId());
        });
    }

    private void authenticateAs(User user) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                null,
                Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}
