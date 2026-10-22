package com.example.testing;

import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(@NotBlank String name) {}
