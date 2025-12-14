package com.archflow.controller;

import com.archflow.dto.CreateTaskDTO;
import com.archflow.dto.TaskResponseDTO;
import com.archflow.dto.UpdateTaskDTO;
import com.archflow.dto.UpdateTaskStageRequest;
import com.archflow.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody @NonNull CreateTaskDTO request) {
        return ResponseEntity.ok(taskService.createTask(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(@PathVariable @NonNull UUID id,
            @RequestBody @NonNull UpdateTaskDTO request) {
        return ResponseEntity.ok(taskService.updateTask(id, request));
    }

    @PatchMapping("/{id}/stage")
    public ResponseEntity<TaskResponseDTO> updateTaskStage(@PathVariable @NonNull UUID id,
            @RequestBody @NonNull UpdateTaskStageRequest request) {
        return ResponseEntity.ok(taskService.updateTaskStage(id, request));
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getTasks(@RequestParam @NonNull UUID projectId) {
        return ResponseEntity.ok(taskService.getTasksByProject(projectId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTask(@PathVariable @NonNull UUID id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }
}
