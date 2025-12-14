package com.archflow.mapper;

import com.archflow.dto.ProjectDTO;
import com.archflow.model.Project;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * Mapper responsável por converter entre Project (entidade) e ProjectDTO.
 * 
 * Princípios SOLID aplicados:
 * - SRP: Responsabilidade única - mapear Project ↔ ProjectDTO
 * - OCP: Aberto para extensão (pode criar mappers personalizados)
 */
@Component
public class ProjectMapper implements DTOMapper<Project, ProjectDTO> {

    @Override
    public ProjectDTO toDTO(Project project) {
        if (project == null) {
            return null;
        }

        return new ProjectDTO(
                Objects.requireNonNull(project.getId()),
                project.getName(),
                project.getClientName(),
                project.getStatus(),
                project.getImageUrl());
    }

    @Override
    public Project toEntity(ProjectDTO dto) {
        if (dto == null) {
            return null;
        }

        Project project = new Project();
        project.setId(dto.getId());
        project.setName(dto.getName());
        project.setClientName(dto.getClientName());
        project.setStatus(dto.getStatus());
        project.setImageUrl(dto.getImageUrl());

        return project;
    }
}
