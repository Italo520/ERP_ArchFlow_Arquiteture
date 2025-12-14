package com.archflow.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class CommentResponseDTO {
    private UUID id;
    private UUID taskId;
    private UUID userId;
    private String userName;
    private String richText;
    private LocalDateTime createdAt;

    public CommentResponseDTO(UUID id, UUID taskId, UUID userId, String userName, String richText,
            LocalDateTime createdAt) {
        this.id = id;
        this.taskId = taskId;
        this.userId = userId;
        this.userName = userName;
        this.richText = richText;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getTaskId() {
        return taskId;
    }

    public void setTaskId(UUID taskId) {
        this.taskId = taskId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRichText() {
        return richText;
    }

    public void setRichText(String richText) {
        this.richText = richText;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
