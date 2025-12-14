package com.archflow.dto;

import com.archflow.model.Priority;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class UpdateTaskDTO {
    private String title;
    private String description;
    private UUID assigneeId;
    private Priority priority;
    private LocalDateTime dueDate;
    private List<String> tags;

    public UpdateTaskDTO() {
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

    private List<com.archflow.model.jsonb.Attachment> attachments;
    private List<com.archflow.model.jsonb.ChecklistItem> checklist;

    public List<com.archflow.model.jsonb.Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<com.archflow.model.jsonb.Attachment> attachments) {
        this.attachments = attachments;
    }

    public List<com.archflow.model.jsonb.ChecklistItem> getChecklist() {
        return checklist;
    }

    public void setChecklist(List<com.archflow.model.jsonb.ChecklistItem> checklist) {
        this.checklist = checklist;
    }
}
