package com.archflow.service;

import com.archflow.dto.ProjectDTO;
import com.archflow.mapper.ProjectMapper;
import com.archflow.mapper.TaskMapper;
import com.archflow.model.Project;
import com.archflow.model.User;
import com.archflow.repository.ProjectRepository;
import com.archflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Serviço de gerenciamento de projetos.
 * Refatorado para seguir princípios SOLID:
 * - SRP: Responsabilidade focada em operações de projeto (sem mapeamento)
 * - DIP: Depende de abstrações (IAuthenticationContext, Mappers)
 */
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final com.archflow.repository.StageRepository stageRepository;
    private final com.archflow.repository.TaskRepository taskRepository;
    private final ProjectMemberService projectMemberService;
    private final IAuthenticationContext authenticationContext;
    private final ProjectMapper projectMapper;
    private final TaskMapper taskMapper;

    @Autowired
    public ProjectService(
            ProjectRepository projectRepository,
            com.archflow.repository.StageRepository stageRepository,
            com.archflow.repository.TaskRepository taskRepository,
            ProjectMemberService projectMemberService,
            IAuthenticationContext authenticationContext,
            ProjectMapper projectMapper,
            TaskMapper taskMapper) {
        this.projectRepository = projectRepository;
        this.stageRepository = stageRepository;
        this.taskRepository = taskRepository;
        this.projectMemberService = projectMemberService;
        this.authenticationContext = authenticationContext;
        this.projectMapper = projectMapper;
        this.taskMapper = taskMapper;
    }

    public ProjectDTO createProject(@NonNull ProjectDTO projectDTO) {
        User user = authenticationContext.getCurrentUser();

        Project project = new Project();
        project.setName(projectDTO.getName());
        project.setClientName(projectDTO.getClientName());
        project.setStatus("TO_DO"); // Default status
        project.setOwner(user);

        Project savedProject = projectRepository.save(project);

        // Add creator as Project Owner (RBAC)
        projectMemberService.addProjectCreatorAsOwner(savedProject, user);

        // Create default stages
        createDefaultStages(savedProject);

        return projectMapper.toDTO(savedProject);
    }

    private void createDefaultStages(@NonNull Project project) {
        List<String> defaultStages = List.of("To Do", "In Progress", "Done");
        for (int i = 0; i < defaultStages.size(); i++) {
            com.archflow.model.Stage stage = new com.archflow.model.Stage();
            stage.setName(defaultStages.get(i));
            stage.setOrder(i);
            stage.setProject(project);
            stageRepository.save(stage);
        }
    }

    public List<ProjectDTO> getUserProjects() {
        User user = authenticationContext.getCurrentUser();

        return projectRepository.findByOwnerId(user.getId()).stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }

    public com.archflow.dto.ProjectDetailsDTO getProjectById(@NonNull UUID id, UUID assigneeId) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        List<com.archflow.model.Stage> stages = stageRepository.findByProjectIdOrderByOrderAsc(id);
        List<com.archflow.model.Task> tasks = taskRepository.findByProjectId(id);

        if (assigneeId != null) {
            tasks = tasks.stream()
                    .filter(task -> task.getAssignee() != null && task.getAssignee().getId().equals(assigneeId))
                    .collect(Collectors.toList());
        }

        final List<com.archflow.model.Task> finalTasks = tasks;

        List<com.archflow.dto.StageDTO> stageDTOs = stages.stream().map(stage -> {
            List<com.archflow.dto.TaskDTO> stageTasks = finalTasks.stream()
                    .filter(task -> task.getStage().getId().equals(stage.getId()))
                    .map(taskMapper::toDTO)
                    .collect(Collectors.toList());
            return new com.archflow.dto.StageDTO(
                    stage.getId(),
                    stage.getName(),
                    stage.getOrder(),
                    stageTasks);
        }).collect(Collectors.toList());

        return new com.archflow.dto.ProjectDetailsDTO(
                project.getId(),
                project.getName(),
                project.getClientName(),
                project.getStatus(),
                stageDTOs);
    }
}
