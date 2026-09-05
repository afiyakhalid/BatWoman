package com.BatWoman.BatWoman_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/shipping/webhooks")
public class ShippingWebhookController {

    @PostMapping("/shiprocket")
    public ResponseEntity<Void> handleShiprocketWebhook(
            @RequestBody String payload
    ) {

        /*
         * Shiprocket webhook processing will be implemented
         * in Phase 2.
         *
         * The raw payload will eventually be:
         *
         * 1. Authenticated
         * 2. Parsed
         * 3. Mapped to BatWoman ShipmentStatus
         * 4. Saved as ShipmentTrackingEvent
         * 5. Current Shipment status updated
         * 6. Customer notified through SSE
         */

        return ResponseEntity.ok().build();
    }
}