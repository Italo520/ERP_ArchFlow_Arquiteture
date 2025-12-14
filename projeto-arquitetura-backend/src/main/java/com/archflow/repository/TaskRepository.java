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

    long countByProjectId(UUID projectId);

    @org.springframework.data.jpa.repository.Query(value = "SELECT DISTINCT t.* FROM tasks t, jsonb_array_elements(t.checklist) elem WHERE t.project_id = :projectId AND elem->>'text' ILIKE concat('%', :term, '%')", nativeQuery = true)
    List<Task> searchByChecklistText(@org.springframework.data.repository.query.Param("projectId") UUID projectId,
            @org.springframework.data.repository.query.Param("term") String term);
}
