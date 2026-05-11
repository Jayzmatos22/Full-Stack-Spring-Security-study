package com.jailton.jwt_auth.service;

import com.jailton.jwt_auth.config.SecurityConfig;
import com.jailton.jwt_auth.dto.AuthResponse;
import com.jailton.jwt_auth.dto.LoginRequest;
import com.jailton.jwt_auth.dto.RegisterRequest;
import com.jailton.jwt_auth.model.User;
import com.jailton.jwt_auth.repository.UserRepository;
import com.jailton.jwt_auth.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void registerUser(RegisterRequest dto) {
        if(userRepository.existsByEmail(dto.email())){
            throw new RuntimeException("Email já cadastrado");
        }
        User user = User.builder()
                .name(dto.name())
                .email(dto.email())
                .password(passwordEncoder.encode(dto.password()))
                .build();

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest dto) {

        // 1. valida email e senha — lança exceção se inválido
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password())
        );

        // 2. busca o usuário no banco
        User user = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 3. gera o token com o email do usuário
        String token = jwtService.generateToken(user.getEmail());

        // 4. devolve o token
        return new AuthResponse(token);
    }
}
