package com.BatWoman.BatWoman_backend.dto.admin.settings;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(

        @NotBlank(message = "Current password is required.")
        String currentPassword,

        @NotBlank(message = "New password is required.")
        @Size(min = 8, max = 100)
        String newPassword,

        @NotBlank(message = "Confirm password is required.")
        String confirmPassword

) {}
