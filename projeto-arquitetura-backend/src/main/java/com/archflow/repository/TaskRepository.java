package com.archflow.repository;

import com.archflow.model.Priority;
import com.archflow.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByProjectId(UUID projectId);

    List<Task> findByStageId(UUID stageId);

    List<Task> findByProjectIdAndPriority(UUID projectId, Priority priority);
}
