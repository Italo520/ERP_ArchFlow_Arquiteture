package com.archflow.mapper;

import com.archflow.dto.member.MemberResponseDTO;
import com.archflow.model.ProjectMember;
import org.springframework.stereotype.Component;

/**
 * Mapper responsável por converter ProjectMember para MemberResponseDTO.
 * 
 * Princípios SOLID aplicados:
 * - SRP: Responsabilidade única - mapear ProjectMember → MemberResponseDTO
 * - ISP: Interface segregada (não precisa de toEntity para este caso)
 */
@Component
public class ProjectMemberMapper {

    /**
     * Converte ProjectMember para MemberResponseDTO.
     * 
     * @param member Entidade ProjectMember
     * @return DTO de resposta
     */
    public MemberResponseDTO toDTO(ProjectMember member) {
        if (member == null) {
            return null;
        }

        return new MemberResponseDTO(
                member.getId(),
                member.getUser().getId(),
                member.getUser().getFullName(),
                member.getUser().getEmail(),
                member.getRole(),
                member.getJoinedAt() != null ? member.getJoinedAt().toLocalDateTime() : null,
                member.getPermissoes());
    }
}
