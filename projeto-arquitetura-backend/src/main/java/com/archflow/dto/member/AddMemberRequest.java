package com.archflow.dto.member;

import com.archflow.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para requisição de adição de membro ao projeto.
 */
public class AddMemberRequest {

    @NotNull(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    private String email;

    @NotNull(message = "Role é obrigatório")
    private Role role;

    private java.util.Map<String, Object> permissoes;

    public AddMemberRequest() {
    }

    public AddMemberRequest(String email, Role role, java.util.Map<String, Object> permissoes) {
        this.email = email;
        this.role = role;
        this.permissoes = permissoes;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public java.util.Map<String, Object> getPermissoes() {
        return permissoes;
    }

    public void setPermissoes(java.util.Map<String, Object> permissoes) {
        this.permissoes = permissoes;
    }
}
