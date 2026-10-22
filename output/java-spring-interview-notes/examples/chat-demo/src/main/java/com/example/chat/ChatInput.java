package com.example.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChatInput(
    @NotBlank @Size(max = 40) String sender,
    @NotBlank @Size(max = 500) String content
) {}
