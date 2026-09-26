package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.service.ShiprocketWebhookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/shipping/webhooks")
@RequiredArgsConstructor
public class ShippingWebhookController {

    private final ShiprocketWebhookService shiprocketWebhookService;

    @PostMapping("/tracking")
    public ResponseEntity<Void> handleTrackingWebhook(
            @RequestHeader(
                    value = "x-api-key",
                    required = false
            )
            String apiKey,

            @RequestBody
            String payload
    ) {

        shiprocketWebhookService.processTrackingWebhook(
                payload,
                apiKey
        );

        return ResponseEntity.ok().build();
    }
}