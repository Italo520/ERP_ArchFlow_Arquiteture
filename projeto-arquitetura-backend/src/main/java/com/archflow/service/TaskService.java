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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskService {

        @Autowired
        private TaskRepository taskRepository;

        @Autowired
        private ProjectRepository projectRepository;

        @Autowired
        private StageRepository stageRepository;

        @Autowired
        private UserRepository userRepository;

        public TaskResponseDTO createTask(@NonNull CreateTaskDTO request) {
                Project project = projectRepository.findById(Objects.requireNonNull(request.getProjectId()))
                                .orElseThrow(() -> new RuntimeException("Project not found"));

                Stage stage = stageRepository.findById(Objects.requireNonNull(request.getStageId()))
                                .orElseThrow(() -> new RuntimeException("Stage not found"));

                User assignee = null;
                if (request.getAssigneeId() != null) {
                        assignee = userRepository.findById(request.getAssigneeId())
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

                Task savedTask = taskRepository.save(task);
                return mapToDTO(savedTask);
        }

        public TaskResponseDTO updateTask(@NonNull UUID taskId, @NonNull UpdateTaskDTO request) {
                Task task = taskRepository.findById(taskId)
                                .orElseThrow(() -> new RuntimeException("Task not found"));

                if (request.getTitle() != null) {
                        task.setTitle(request.getTitle());
                }
                if (request.getDescription() != null) {
                        task.setDescription(request.getDescription());
                }
                if (request.getPriority() != null) {
                        task.setPriority(request.getPriority());
                }
                if (request.getDueDate() != null) {
                        task.setDueDate(request.getDueDate());
                }
                if (request.getTags() != null) {
                        task.setTags(request.getTags());
                }
                if (request.getAssigneeId() != null) {
                        User assignee = userRepository.findById(request.getAssigneeId())
                                        .orElseThrow(() -> new RuntimeException("Assignee not found"));
                        task.setAssignee(assignee);
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
                Task updatedTask = taskRepository.save(task);
                return mapToDTO(updatedTask);
        }

        public List<TaskResponseDTO> getTasksByProject(UUID projectId) {
                return taskRepository.findByProjectId(projectId).stream()
                                .map(this::mapToDTO)
                                .collect(Collectors.toList());
        }

        private TaskResponseDTO mapToDTO(@NonNull Task task) {
                return new TaskResponseDTO(
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
        }
}
