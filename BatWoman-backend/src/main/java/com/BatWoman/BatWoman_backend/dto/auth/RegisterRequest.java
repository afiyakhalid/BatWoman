package com.BatWoman.BatWoman_backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank
        String firstName,

        String lastName,

        @Email
        @NotBlank
        String email,

        @Pattern(regexp = "^[0-9]{10}$")
        String phone,

        @Size(min = 8, max = 100)
        String password

) {
}


