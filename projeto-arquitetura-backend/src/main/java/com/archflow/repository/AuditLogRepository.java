package com.archflow.repository;

import com.archflow.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {

    Page<AuditLog> findByUserId(UUID userId, Pageable pageable);

    Page<AuditLog> findByProjectId(UUID projectId, Pageable pageable);

    List<AuditLog> findByTimestampAfter(LocalDateTime timestamp);

    Page<AuditLog> findByTableName(String tableName, Pageable pageable);
}
