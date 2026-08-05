package com.BatWoman.BatWoman_backend.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ContactRequest(

        @NotBlank(message = "Name is required.")
        @Size(max = 100, message = "Name cannot exceed 100 characters.")
        String name,

        @NotBlank(message = "Email is required.")
        @Email(message = "Please enter a valid email address.")
        @Size(max = 255, message = "Email cannot exceed 255 characters.")
        String email,

        @NotBlank(message = "Phone number is required.")
        @Pattern(
                regexp = "^[+]?[0-9\\s()-]{7,20}$",
                message = "Please enter a valid phone number."
        )
        String phone,

        @Size(max = 50, message = "Order number cannot exceed 50 characters.")
        String orderNumber,

        @NotBlank(message = "Message is required.")
        @Size(
                min = 10,
                max = 2000,
                message = "Message must be between 10 and 2000 characters."
        )
        String message

) {
}