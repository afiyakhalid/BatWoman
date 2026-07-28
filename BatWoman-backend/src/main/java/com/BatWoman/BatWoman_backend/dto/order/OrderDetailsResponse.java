package com.BatWoman.BatWoman_backend.dto.order;

import com.BatWoman.BatWoman_backend.dto.address.AddressResponse;
import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import com.BatWoman.BatWoman_backend.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record OrderDetailsResponse(

        UUID orderId,

        String orderNumber,

        OrderStatus status,

        PaymentStatus paymentStatus,

        BigDecimal subtotal,

        BigDecimal shippingCharge,

        BigDecimal discount,

        BigDecimal total,

        OffsetDateTime createdAt,

        AddressResponse shippingAddress,

        List<OrderResponse.OrderItemResponse> items

) {
}