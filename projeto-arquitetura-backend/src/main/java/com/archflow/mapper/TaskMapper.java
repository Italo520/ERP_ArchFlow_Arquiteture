package com.archflow.mapper;

import com.archflow.dto.TaskDTO;
import com.archflow.model.Task;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * Mapper responsável por converter entre Task e TaskDTO.
 * 
 * Princípios SOLID aplicados:
 * - SRP: Responsabilidade única - mapear Task ↔ TaskDTO
 */
@Component
public class TaskMapper {

    /**
     * Converte Task para TaskDTO.
     * 
     * @param task Entidade Task
     * @return TaskDTO
     */
    public TaskDTO toDTO(Task task) {
        if (task == null) {
            return null;
        }

        return new TaskDTO(
                Objects.requireNonNull(task.getId()),
                task.getTitle(),
                task.getDescription(),
                Objects.requireNonNull(task.getStage().getId()),
                task.getAssignee() != null ? task.getAssignee().getId() : null,
                task.getPriority(),
                task.getDueDate(),
                task.getTags());
    }
}
