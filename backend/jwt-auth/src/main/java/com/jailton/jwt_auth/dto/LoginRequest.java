package com.jailton.jwt_auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// LoginRequest.java
public record LoginRequest(
        @Email @NotBlank String email,
        @NotBlank String password
) {}
