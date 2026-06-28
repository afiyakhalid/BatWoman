package com.BatWoman.BatWoman_backend.dto.order;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateOrderRequest(

        @NotNull
        UUID cartId,

        UUID addressId,

        UUID userId

) {
}
