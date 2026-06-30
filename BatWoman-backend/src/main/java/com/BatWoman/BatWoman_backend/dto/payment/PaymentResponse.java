package com.BatWoman.BatWoman_backend.dto.payment;

import com.BatWoman.BatWoman_backend.enums.PaymentStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record PaymentResponse(

        UUID paymentId,

        UUID orderId,

        String razorpayOrderId,

        String razorpayPaymentId,

        PaymentStatus status,

        OffsetDateTime paidAt

) {
}