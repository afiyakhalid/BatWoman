package com.BatWoman.BatWoman_backend.dto.shipping;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateShipmentRequest(

        @NotNull(message = "Order ID is required.")
        UUID orderId

) {
}