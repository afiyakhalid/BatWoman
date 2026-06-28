package com.BatWoman.BatWoman_backend.dto.cart;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record CartResponse(

        UUID cartId,

        List<CartItemResponse> items,

        BigDecimal totalAmount

) {

    public record CartItemResponse(

            UUID productId,

            String productName,

            String image,

            Integer quantity,

            BigDecimal price,

            BigDecimal subtotal

    ) {
    }
}
