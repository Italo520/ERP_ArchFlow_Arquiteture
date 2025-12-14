package com.archflow.service;

import com.archflow.model.User;

/**
 * Interface para abstração de contexto de autenticação.
 * Segue DIP (Dependency Inversion Principle) - dependa de abstrações, não de
 * implementações concretas.
 * 
 * Benefícios:
 * - Facilita testes com mocks
 * - Desacopla do framework Spring Security
 * - Permite trocar implementação sem modificar consumers
 */
public interface IAuthenticationContext {

    /**
     * Obtém o usuário atualmente autenticado.
     * 
     * @return User autenticado
     * @throws RuntimeException se usuário não estiver autenticado
     */
    User getCurrentUser();

    /**
     * Obtém o email do usuário atualmente autenticado.
     * 
     * @return Email do usuário
     * @throws RuntimeException se usuário não estiver autenticado
     */
    String getCurrentUserEmail();

    /**
     * Verifica se há um usuário autenticado.
     * 
     * @return true se autenticado, false caso contrário
     */
    boolean isAuthenticated();
}
