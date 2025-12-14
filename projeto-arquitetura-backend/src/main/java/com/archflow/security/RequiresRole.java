package com.archflow.security;

import com.archflow.model.Role;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Anotação para indicar que um endpoint requer uma role mínima em um projeto.
 * Usado em conjunto com ProjectRoleAspect para validação automática.
 * 
 * Exemplo de uso:
 * 
 * @RequiresRole(Role.PROJECT_OWNER)
 *                                   public ResponseEntity<?>
 *                                   addMember(@PathVariable UUID projectId,
 *                                   ...)
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresRole {

    /**
     * Role mínima necessária para executar a ação.
     * A hierarquia de roles é: ADMIN > PROJECT_OWNER > MANAGER > ARCHITECT > VIEWER
     * > CLIENT
     */
    Role value();

    /**
     * Nome do parâmetro que contém o projectId.
     * Default é "projectId".
     */
    String projectIdParam() default "projectId";
}
