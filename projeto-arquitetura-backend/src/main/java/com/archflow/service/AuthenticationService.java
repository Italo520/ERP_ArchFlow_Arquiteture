package com.archflow.service;

import com.archflow.dto.LoginRequest;
import com.archflow.dto.LoginResponse;
import com.archflow.model.User;
import com.archflow.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

/**
 * Implementação do serviço de autenticação.
 * 
 * Princípios SOLID aplicados:
 * - SRP: Responsabilidade única - autenticar usuários
 * - DIP: Implementa interface IAuthenticationService
 * - DIP: Depende de abstrações (IAuthenticationService, JwtService)
 */
@Service
public class AuthenticationService implements IAuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        // Autenticação via Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        // Buscar usuário autenticado
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado após autenticação"));

        // Gerar token JWT
        String jwtToken = jwtService.generateToken(user);

        return new LoginResponse(jwtToken);
    }

    @Override
    public boolean validateToken(String token) {
        return jwtService.isTokenValid(token);
    }
}
