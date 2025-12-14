package com.archflow.controller;

import com.archflow.dto.LoginRequest;
import com.archflow.dto.LoginResponse;
import com.archflow.dto.RegisterRequest;
import com.archflow.dto.UserResponse;
import com.archflow.model.User;
import com.archflow.service.IAuthenticationService;
import com.archflow.service.IUserRegistrationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller de autenticação e registro.
 * Refatorado para seguir SOLID:
 * - SRP: Responsabilidades separadas em serviços distintos
 * - DIP: Depende de interfaces (IUserRegistrationService,
 * IAuthenticationService)
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final IUserRegistrationService userRegistrationService;
    private final IAuthenticationService authenticationService;

    public AuthController(
            IUserRegistrationService userRegistrationService,
            IAuthenticationService authenticationService) {
        this.userRegistrationService = userRegistrationService;
        this.authenticationService = authenticationService;
    }

    /**
     * Registra um novo usuário no sistema.
     */
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest registerRequest) {
        User user = userRegistrationService.register(registerRequest);
        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    /**
     * Autentica um usuário e retorna token JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authenticationService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
}
