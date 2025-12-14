package com.archflow.dto;

import com.archflow.model.Priority;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class CreateTaskDTO {
    private String title;
    private String description;
    private UUID projectId;
    private UUID stageId;
    private UUID assigneeId;
    private Priority priority;
    private LocalDateTime dueDate;
    private List<String> tags;

    public CreateTaskDTO() {
    }

    public CreateTaskDTO(String title, String description, UUID projectId, UUID stageId, UUID assigneeId,
            Priority priority, LocalDateTime dueDate, List<String> tags) {
        this.title = title;
        this.description = description;
        this.projectId = projectId;
        this.stageId = stageId;
        this.assigneeId = assigneeId;
        this.priority = priority;
        this.dueDate = dueDate;
        this.tags = tags;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UUID getProjectId() {
        return projectId;
    }

    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }

    public UUID getStageId() {
        return stageId;
    }

    public void setStageId(UUID stageId) {
        this.stageId = stageId;
    }

    public UUID getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(UUID assigneeId) {
        this.assigneeId = assigneeId;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
