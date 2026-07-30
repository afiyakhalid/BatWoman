package com.BatWoman.BatWoman_backend.dto.admin;

import com.BatWoman.BatWoman_backend.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record RecentOrderResponse(

        UUID orderId,

        String orderNumber,

        String customerName,

        BigDecimal total,

        OrderStatus status,

        OffsetDateTime createdAt

) {
}
