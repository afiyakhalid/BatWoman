package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.shipping.CreateShipmentRequest;
import com.BatWoman.BatWoman_backend.dto.shipping.ShipmentResponse;
import com.BatWoman.BatWoman_backend.dto.shipping.TrackingResponse;
import com.BatWoman.BatWoman_backend.service.ShippingService;
import com.BatWoman.BatWoman_backend.service.TrackingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/shipping")
@RequiredArgsConstructor
public class ShippingController {

    private final ShippingService shippingService;

    private final TrackingService trackingService;

    @PostMapping("/shipments")
    public ResponseEntity<ShipmentResponse> createShipment(
            @Valid @RequestBody CreateShipmentRequest request
    ) {

        ShipmentResponse response =
                shippingService.createShipment(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/shipments/{shipmentId}")
    public ResponseEntity<ShipmentResponse> getShipment(
            @PathVariable UUID shipmentId
    ) {

        return ResponseEntity.ok(
                shippingService.getShipmentById(shipmentId)
        );
    }

    @GetMapping("/orders/{orderId}/shipment")
    public ResponseEntity<ShipmentResponse> getShipmentByOrder(
            @PathVariable UUID orderId
    ) {

        return ResponseEntity.ok(
                shippingService.getShipmentByOrderId(orderId)
        );
    }

    @PatchMapping("/shipments/{shipmentId}/status")
    public ResponseEntity<ShipmentResponse> updateShipmentStatus(
            @PathVariable UUID shipmentId,
            @RequestParam String status
    ) {

        return ResponseEntity.ok(
                shippingService.updateShipmentStatus(
                        shipmentId,
                        status
                )
        );
    }

    @GetMapping("/shipments/{shipmentId}/tracking")
    public ResponseEntity<TrackingResponse> getTracking(
            @PathVariable UUID shipmentId
    ) {

        return ResponseEntity.ok(
                trackingService.getTrackingByShipmentId(
                        shipmentId
                )
        );
    }

    @GetMapping("/orders/{orderId}/tracking")
    public ResponseEntity<TrackingResponse> getTrackingByOrder(
            @PathVariable UUID orderId
    ) {

        return ResponseEntity.ok(
                trackingService.getTrackingByOrderId(orderId)
        );
    }

    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<TrackingResponse> getTrackingByNumber(
            @PathVariable String trackingNumber
    ) {

        return ResponseEntity.ok(
                trackingService.getTrackingByNumber(
                        trackingNumber
                )
        );
    }
}