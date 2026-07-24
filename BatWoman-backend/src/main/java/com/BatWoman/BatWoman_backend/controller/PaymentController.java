package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.payment.CreatePaymentRequest;
import com.BatWoman.BatWoman_backend.dto.payment.PaymentResponse;
import com.BatWoman.BatWoman_backend.dto.payment.VerifyPaymentRequest;
import com.BatWoman.BatWoman_backend.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(
            @Valid @RequestBody CreatePaymentRequest request) {

        return ResponseEntity.ok(
                paymentService.createPayment(request)
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<PaymentResponse> verifyPayment(
            @Valid @RequestBody VerifyPaymentRequest request) {
        System.out.println(">>> PAYMENT CONTROLLER HIT <<<");
        return ResponseEntity.ok(
                paymentService.verifyPayment(
                        request.paymentId(),
                        request.razorpayPaymentId(),
                        request.razorpaySignature()
                )
        );
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(
            @RequestBody String payload,
            @RequestHeader("X-Razorpay-Signature") String signature) {

        paymentService.handleWebhook(payload, signature);

        return ResponseEntity.ok().build();
    }
}
