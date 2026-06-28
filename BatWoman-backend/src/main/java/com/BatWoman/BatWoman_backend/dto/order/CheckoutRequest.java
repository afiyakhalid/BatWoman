package com.BatWoman.BatWoman_backend.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CheckoutRequest(

        UUID userId,

        UUID addressId,

        @NotBlank
        String guestName,

        @NotBlank
        String guestEmail,

        @NotBlank
        String guestPhone,

        @NotBlank
        String guestAddress,

        @NotBlank
        String guestCity,

        @NotBlank
        String guestState,

        @NotBlank
        String guestPincode

) {
}
