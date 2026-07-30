package com.BatWoman.BatWoman_backend.dto.admin.settings;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ChangeEmailRequest(

        @NotBlank(message = "Email is required.")
        @Email(message = "Invalid email format.")
        String newEmail,

        @NotBlank(message = "Password is required.")
        String password

) {}
