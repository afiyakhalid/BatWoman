package com.BatWoman.BatWoman_backend.dto.order;

import com.BatWoman.BatWoman_backend.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record OrderResponse(

        UUID orderId,

        String orderNumber,

        OrderStatus status,

        BigDecimal subtotal,

        BigDecimal shippingCharge,

        BigDecimal totalAmount,

        OffsetDateTime createdAt,

        List<OrderItemResponse> items

) {

    public record OrderItemResponse(

            UUID productId,

            String productName,

            Integer quantity,

            BigDecimal unitPrice,

            BigDecimal totalPrice

    ) {
    }

}
