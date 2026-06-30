package com.BatWoman.BatWoman_backend.dto.payment;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record VerifyPaymentRequest(



        UUID paymentId,

        @NotBlank
        String razorpayPaymentId,

        @NotBlank
        String razorpaySignature

) {}


