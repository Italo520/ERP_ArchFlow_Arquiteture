package com.archflow.dto.member;

import com.archflow.model.Role;

import java.time.LocalDateTime;
import java.util.UUID;

public class MemberResponseDTO {
    private UUID id; // member relationship id
    private UUID userId;
    private String userName;
    private String userEmail;
    private Role role;
    private LocalDateTime joinedAt;
    private java.util.Map<String, Object> permissoes;

    public MemberResponseDTO() {
    }

    public MemberResponseDTO(UUID id, UUID userId, String userName, String userEmail, Role role,
            LocalDateTime joinedAt, java.util.Map<String, Object> permissoes) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.role = role;
        this.joinedAt = joinedAt;
        this.permissoes = permissoes;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public java.util.Map<String, Object> getPermissoes() {
        return permissoes;
    }

    public void setPermissoes(java.util.Map<String, Object> permissoes) {
        this.permissoes = permissoes;
    }
}
