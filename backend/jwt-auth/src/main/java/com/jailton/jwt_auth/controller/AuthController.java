package com.jailton.jwt_auth.controller;

import com.jailton.jwt_auth.dto.AuthResponse;
import com.jailton.jwt_auth.dto.LoginRequest;
import com.jailton.jwt_auth.dto.RegisterRequest;
import com.jailton.jwt_auth.repository.UserRepository;
import com.jailton.jwt_auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@Valid @RequestBody RegisterRequest dto){
        authService.registerUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody LoginRequest dto){
        AuthResponse response = authService.login(dto);
        return ResponseEntity.ok(response);
    }



}
