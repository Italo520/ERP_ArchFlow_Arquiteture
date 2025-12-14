package com.archflow.controller;

import com.archflow.dto.CommentResponseDTO;
import com.archflow.dto.CreateCommentDTO;
import com.archflow.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CommentResponseDTO> addComment(@RequestBody @Valid @NonNull CreateCommentDTO request) {
        CommentResponseDTO response = commentService.addComment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<CommentResponseDTO>> getCommentsByTask(@PathVariable @NonNull UUID taskId) {
        return ResponseEntity.ok(commentService.getCommentsByTask(taskId));
    }
}
