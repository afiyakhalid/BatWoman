package com.BatWoman.BatWoman_backend.dto.cart;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AddToCartRequest(

        @NotNull
        UUID productId,

        @Min(1)
        Integer quantity

) {
}
