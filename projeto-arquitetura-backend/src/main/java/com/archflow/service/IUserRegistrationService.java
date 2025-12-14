package com.archflow.service;

import com.archflow.dto.RegisterRequest;
import com.archflow.model.User;

/**
 * Interface para serviço de registro de usuários.
 * Segue SRP (Single Responsibility) - responsável APENAS por registrar novos
 * usuários.
 * Segue DIP (Dependency Inversion) - dependências devem usar esta abstração.
 */
public interface IUserRegistrationService {

    /**
     * Registra um novo usuário no sistema.
     * 
     * @param registerRequest Dados do novo usuário
     * @return Usuário criado
     * @throws RuntimeException se email já estiver em uso
     */
    User register(RegisterRequest registerRequest);

    /**
     * Verifica se um email já está cadastrado no sistema.
     * 
     * @param email Email a ser verificado
     * @return true se email já existe, false caso contrário
     */
    boolean emailExists(String email);
}
