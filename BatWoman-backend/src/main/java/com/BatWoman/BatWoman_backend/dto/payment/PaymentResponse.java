package com.BatWoman.BatWoman_backend.dto.payment;

import com.BatWoman.BatWoman_backend.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record PaymentResponse(

        UUID paymentId,

        UUID orderId,

        String razorpayOrderId,

        String razorpayPaymentId,

        BigDecimal amount,

        String currency,

        PaymentStatus status,

        OffsetDateTime paidAt

) {
}