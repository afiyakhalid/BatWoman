package com.BatWoman.BatWoman_backend.dto.cart;

import jakarta.validation.constraints.Min;

public record UpdateCartItemRequest(

        @Min(1)
        Integer quantity

) {
}
