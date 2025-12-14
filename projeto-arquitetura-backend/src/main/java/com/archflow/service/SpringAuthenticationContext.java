package com.archflow.service;

import com.archflow.model.User;
import com.archflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Implementação Spring Security do contexto de autenticação.
 * 
 * Responsabilidade Única (SRP): Gerencia APENAS a obtenção do usuário
 * autenticado.
 * Dependency Inversion (DIP): Implementa interface, não é usada diretamente.
 * 
 * Centraliza toda lógica de acesso ao SecurityContext em um único lugar.
 */
@Service
public class SpringAuthenticationContext implements IAuthenticationContext {

    private final UserRepository userRepository;

    @Autowired
    public SpringAuthenticationContext(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getCurrentUser() {
        String email = getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(
                        "Usuário autenticado não encontrado no banco de dados: " + email));
    }

    @Override
    public String getCurrentUserEmail() {
        if (!isAuthenticated()) {
            throw new AccessDeniedException("Usuário não autenticado");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @Override
    public boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null &&
                authentication.isAuthenticated() &&
                !"anonymousUser".equals(authentication.getPrincipal());
    }
}
