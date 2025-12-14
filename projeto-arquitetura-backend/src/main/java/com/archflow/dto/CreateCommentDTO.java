package com.archflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class CreateCommentDTO {

    @NotNull(message = "Task ID is required")
    private UUID taskId;

    @NotBlank(message = "Comment content is required")
    private String richText;

    public CreateCommentDTO() {
    }

    public CreateCommentDTO(UUID taskId, String richText) {
        this.taskId = taskId;
        this.richText = richText;
    }

    public UUID getTaskId() {
        return taskId;
    }

    public void setTaskId(UUID taskId) {
        this.taskId = taskId;
    }

    public String getRichText() {
        return richText;
    }

    public void setRichText(String richText) {
        this.richText = richText;
    }
}
