package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.payment.CreatePaymentRequest;
import com.BatWoman.BatWoman_backend.dto.payment.PaymentResponse;

import java.util.UUID;

public interface PaymentService {

    /**
     * Create Razorpay Order.
     */
    PaymentResponse createPayment(CreatePaymentRequest request);

    /**
     * Verify Razorpay payment.
     */
    PaymentResponse verifyPayment(
            UUID paymentId,
            String razorpayPaymentId,
            String razorpaySignature
    );

    /**
     * Handle Razorpay webhook.
     */
    void handleWebhook(String payload, String signature);

}
