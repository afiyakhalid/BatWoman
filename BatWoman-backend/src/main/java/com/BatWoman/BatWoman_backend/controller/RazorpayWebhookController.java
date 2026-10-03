package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments/webhook")
@RequiredArgsConstructor
public class RazorpayWebhookController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Void> handleWebhook(
            @RequestBody String payload,
            @RequestHeader(value = "X-Razorpay-Signature", required = false)
            String signature
    ) {

        paymentService.handleWebhook(payload, signature);

        return ResponseEntity.ok().build();
    }
}