package com.archflow.service;

import com.archflow.dto.RegisterRequest;
import com.archflow.model.User;
import com.archflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Implementação do serviço de registro de usuários.
 * 
 * Princípios SOLID aplicados:
 * - SRP: Responsabilidade única - registrar usuários
 * - DIP: Implementa interface IUserRegistrationService
 * - OCP: Aberto para extensão (pode criar validadores customizados)
 */
@Service
public class UserRegistrationService implements IUserRegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserRegistrationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(RegisterRequest registerRequest) {
        // Validação de email duplicado
        if (emailExists(registerRequest.getEmail())) {
            throw new RuntimeException("Email já está em uso: " + registerRequest.getEmail());
        }

        // Criação do usuário
        User user = new User();
        user.setFullName(registerRequest.getFullName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // Persistência
        return userRepository.save(user);
    }

    @Override
    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
