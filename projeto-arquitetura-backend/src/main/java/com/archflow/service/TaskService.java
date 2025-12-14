package com.archflow.service;

import com.archflow.dto.CreateTaskDTO;
import com.archflow.dto.TaskResponseDTO;
import com.archflow.dto.UpdateTaskDTO;
import com.archflow.dto.UpdateTaskStageRequest;
import com.archflow.model.Project;
import com.archflow.model.Stage;
import com.archflow.model.Task;
import com.archflow.model.User;
import com.archflow.repository.ProjectRepository;
import com.archflow.repository.StageRepository;
import com.archflow.repository.TaskRepository;
import com.archflow.repository.UserRepository;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskService {

        private final TaskRepository taskRepository;
        private final ProjectRepository projectRepository;
        private final StageRepository stageRepository;
        private final UserRepository userRepository;
        private final IAuthenticationContext authenticationContext;

        public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository,
                        StageRepository stageRepository, UserRepository userRepository,
                        IAuthenticationContext authenticationContext) {
                this.taskRepository = taskRepository;
                this.projectRepository = projectRepository;
                this.stageRepository = stageRepository;
                this.userRepository = userRepository;
                this.authenticationContext = authenticationContext;
        }

        public TaskResponseDTO createTask(@NonNull CreateTaskDTO request) {
                Project project = projectRepository.findById(Objects.requireNonNull(request.getProjectId()))
                                .orElseThrow(() -> new RuntimeException("Project not found"));

                Stage stage = stageRepository.findById(Objects.requireNonNull(request.getStageId()))
                                .orElseThrow(() -> new RuntimeException("Stage not found"));

                User assignee = null;
                if (request.getAssigneeId() != null) {
                        assignee = userRepository.findById(Objects.requireNonNull(request.getAssigneeId()))
                                        .orElseThrow(() -> new RuntimeException("Assignee not found"));
                }

                Task task = new Task();
                task.setTitle(request.getTitle());
                task.setDescription(request.getDescription());
                task.setProject(project);
                task.setStage(stage);
                task.setAssignee(assignee);
                task.setPriority(request.getPriority());
                task.setDueDate(request.getDueDate());
                task.setTags(request.getTags());
                task.setAttachments(request.getAttachments());
                task.setChecklist(request.getChecklist());
                task.setComments(new java.util.ArrayList<>());
                task.setHistorico(new java.util.ArrayList<>());

                // Add creation history
                User currentUser = null;
                try {
                        currentUser = authenticationContext.getCurrentUser();
                } catch (Exception e) {
                        // Ignore if no auth context (e.g. tests)
                }

                if (currentUser != null) {
                        com.archflow.model.jsonb.HistoricoItem historyItem = new com.archflow.model.jsonb.HistoricoItem(
                                        java.time.LocalDateTime.now(),
                                        currentUser.getId().toString(),
                                        currentUser.getFullName(),
                                        "CREATED",
                                        "Tarefa criada");
                        task.getHistorico().add(historyItem);
                }

                Task savedTask = taskRepository.save(task);
                return mapToDTO(savedTask);
        }

        public TaskResponseDTO updateTask(@NonNull UUID taskId, @NonNull UpdateTaskDTO request) {
                Task task = taskRepository.findById(taskId)
                                .orElseThrow(() -> new RuntimeException("Task not found"));

                User currentUser = null;
                try {
                        currentUser = authenticationContext.getCurrentUser();
                } catch (Exception e) {
                        // ignore
                }

                List<String> changes = new java.util.ArrayList<>();

                if (request.getTitle() != null && !Objects.equals(task.getTitle(), request.getTitle())) {
                        changes.add("Título alterado");
                        task.setTitle(request.getTitle());
                }
                if (request.getDescription() != null
                                && !Objects.equals(task.getDescription(), request.getDescription())) {
                        changes.add("Descrição alterada");
                        task.setDescription(request.getDescription());
                }
                if (request.getPriority() != null && !Objects.equals(task.getPriority(), request.getPriority())) {
                        changes.add("Prioridade alterada de " + task.getPriority() + " para " + request.getPriority());
                        task.setPriority(request.getPriority());
                }
                if (request.getDueDate() != null && !Objects.equals(task.getDueDate(), request.getDueDate())) {
                        changes.add("Data de entrega alterada");
                        task.setDueDate(request.getDueDate());
                }
                if (request.getTags() != null && !Objects.equals(task.getTags(), request.getTags())) {
                        changes.add("Tags atualizadas");
                        task.setTags(request.getTags());
                }
                if (request.getAssigneeId() != null) {
                        User assignee = userRepository.findById(Objects.requireNonNull(request.getAssigneeId()))
                                        .orElseThrow(() -> new RuntimeException("Assignee not found"));
                        if (task.getAssignee() == null || !task.getAssignee().getId().equals(assignee.getId())) {
                                changes.add("Responsável alterado para " + assignee.getFullName());
                                task.setAssignee(assignee);
                        }
                }

                if (request.getAttachments() != null) {
                        task.setAttachments(request.getAttachments());
                }
                if (request.getChecklist() != null) {
                        task.setChecklist(request.getChecklist());
                }

                if (!changes.isEmpty() && currentUser != null) {
                        com.archflow.model.jsonb.HistoricoItem historyItem = new com.archflow.model.jsonb.HistoricoItem(
                                        java.time.LocalDateTime.now(),
                                        currentUser.getId().toString(),
                                        currentUser.getFullName(),
                                        "UPDATED",
                                        String.join("; ", changes));
                        if (task.getHistorico() == null)
                                task.setHistorico(new java.util.ArrayList<>());
                        task.getHistorico().add(historyItem);
                }

                Task updatedTask = taskRepository.save(task);
                return mapToDTO(updatedTask);
        }

        public TaskResponseDTO updateTaskStage(@NonNull UUID taskId, @NonNull UpdateTaskStageRequest request) {
                Task task = taskRepository.findById(Objects.requireNonNull(taskId))
                                .orElseThrow(() -> new RuntimeException("Task not found"));

                Stage stage = stageRepository.findById(Objects.requireNonNull(request.getStageId()))
                                .orElseThrow(() -> new RuntimeException("Stage not found"));

                task.setStage(stage);

                // Add history
                try {
                        User currentUser = authenticationContext.getCurrentUser();
                        if (currentUser != null) {
                                com.archflow.model.jsonb.HistoricoItem historyItem = new com.archflow.model.jsonb.HistoricoItem(
                                                java.time.LocalDateTime.now(),
                                                currentUser.getId().toString(),
                                                currentUser.getFullName(),
                                                "STATUS_CHANGED",
                                                "Status alterado para " + stage.getName());
                                if (task.getHistorico() == null)
                                        task.setHistorico(new java.util.ArrayList<>());
                                task.getHistorico().add(historyItem);
                        }
                } catch (Exception e) {
                        // ignore
                }

                Task updatedTask = taskRepository.save(task);
                return mapToDTO(updatedTask);
        }

        public List<TaskResponseDTO> getTasksByProject(UUID projectId) {
                return taskRepository.findByProjectId(projectId).stream()
                                .map(this::mapToDTO)
                                .collect(Collectors.toList());
        }

        private TaskResponseDTO mapToDTO(@NonNull Task task) {
                TaskResponseDTO dto = new TaskResponseDTO(
                                task.getId(),
                                task.getTitle(),
                                task.getDescription(),
                                task.getProject().getId(),
                                task.getProject().getName(),
                                task.getStage().getId(),
                                task.getStage().getName(),
                                task.getAssignee() != null ? task.getAssignee().getId() : null,
                                task.getAssignee() != null ? task.getAssignee().getFullName() : null,
                                task.getPriority(),
                                task.getDueDate(),
                                task.getTags(),
                                task.getCreatedAt() != null ? task.getCreatedAt().toLocalDateTime() : null);

                dto.setAttachments(task.getAttachments());
                dto.setComments(task.getComments());
                dto.setChecklist(task.getChecklist());
                dto.setHistorico(task.getHistorico());

                return dto;
        }
}
