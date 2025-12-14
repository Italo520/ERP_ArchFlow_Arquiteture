package com.archflow.service;

import com.archflow.dto.LoginRequest;
import com.archflow.dto.LoginResponse;

/**
 * Interface para serviço de autenticação.
 * Segue SRP (Single Responsibility) - responsável APENAS por autenticar
 * usuários.
 * Segue DIP (Dependency Inversion) - dependências devem usar esta abstração.
 */
public interface IAuthenticationService {

    /**
     * Autentica um usuário e retorna um token JWT.
     * 
     * @param loginRequest Credenciais de login
     * @return LoginResponse contendo token JWT
     * @throws org.springframework.security.authentication.BadCredentialsException se
     *                                                                             credenciais
     *                                                                             inválidas
     */
    LoginResponse login(LoginRequest loginRequest);

    /**
     * Valida um token JWT.
     * 
     * @param token Token JWT a ser validado
     * @return true se token é válido, false caso contrário
     */
    boolean validateToken(String token);
}
