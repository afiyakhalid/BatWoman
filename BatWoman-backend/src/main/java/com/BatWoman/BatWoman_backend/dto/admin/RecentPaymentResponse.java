package com.BatWoman.BatWoman_backend.dto.admin;

import com.BatWoman.BatWoman_backend.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record RecentPaymentResponse(

        UUID paymentId,

        String razorpayPaymentId,

        String orderNumber,

        BigDecimal amount,

        PaymentStatus status,

        OffsetDateTime paidAt

) {
}
