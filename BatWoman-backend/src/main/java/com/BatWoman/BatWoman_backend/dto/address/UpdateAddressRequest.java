package com.BatWoman.BatWoman_backend.dto.address;

import jakarta.validation.constraints.NotBlank;

public record UpdateAddressRequest(

        @NotBlank
        String fullName,

        @NotBlank
        String phone,

        @NotBlank
        String addressLine1,

        String addressLine2,

        @NotBlank
        String city,

        @NotBlank
        String state,

        @NotBlank
        String country,

        @NotBlank
        String postalCode,

        Boolean defaultAddress

) {
}
