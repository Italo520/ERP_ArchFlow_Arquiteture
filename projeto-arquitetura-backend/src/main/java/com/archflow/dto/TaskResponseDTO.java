package com.archflow.dto;

import com.archflow.model.Priority;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class TaskResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private UUID projectId;
    private String projectName;
    private UUID stageId;
    private String stageName;
    private UUID assigneeId;
    private String assigneeName;
    private Priority priority;
    private LocalDateTime dueDate;
    private List<String> tags;
    private LocalDateTime createdAt;

    public TaskResponseDTO() {
    }

    public TaskResponseDTO(UUID id, String title, String description, UUID projectId, String projectName,
            UUID stageId, String stageName, UUID assigneeId, String assigneeName,
            Priority priority, LocalDateTime dueDate, List<String> tags, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.projectId = projectId;
        this.projectName = projectName;
        this.stageId = stageId;
        this.stageName = stageName;
        this.assigneeId = assigneeId;
        this.assigneeName = assigneeName;
        this.priority = priority;
        this.dueDate = dueDate;
        this.tags = tags;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public UUID getStageId() {
        return stageId;
    }

    public void setStageId(UUID stageId) {
        this.stageId = stageId;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public UUID getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(UUID assigneeId) {
        this.assigneeId = assigneeId;
    }

    public String getAssigneeName() {
        return assigneeName;
    }

    public void setAssigneeName(String assigneeName) {
        this.assigneeName = assigneeName;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    private List<com.archflow.model.jsonb.Attachment> attachments;
    private List<com.archflow.model.jsonb.TaskComment> comments;
    private List<com.archflow.model.jsonb.ChecklistItem> checklist;
    private List<com.archflow.model.jsonb.HistoricoItem> historico;

    public List<com.archflow.model.jsonb.Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<com.archflow.model.jsonb.Attachment> attachments) {
        this.attachments = attachments;
    }

    public List<com.archflow.model.jsonb.TaskComment> getComments() {
        return comments;
    }

    public void setComments(List<com.archflow.model.jsonb.TaskComment> comments) {
        this.comments = comments;
    }

    public List<com.archflow.model.jsonb.ChecklistItem> getChecklist() {
        return checklist;
    }

    public void setChecklist(List<com.archflow.model.jsonb.ChecklistItem> checklist) {
        this.checklist = checklist;
    }

    public List<com.archflow.model.jsonb.HistoricoItem> getHistorico() {
        return historico;
    }

    public void setHistorico(List<com.archflow.model.jsonb.HistoricoItem> historico) {
        this.historico = historico;
    }
}
