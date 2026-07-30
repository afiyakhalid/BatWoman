package com.BatWoman.BatWoman_backend.dto.admin.settings;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateAdminProfileRequest(

        @NotBlank(message = "First name is required.")
        @Size(max = 50)
        String firstName,

        @NotBlank(message = "Last name is required.")
        @Size(max = 50)
        String lastName,

        @Pattern(
                regexp = "^\\d{10}$",
                message = "Phone number must contain exactly 10 digits."
        )
        String phoneNumber

) {}
