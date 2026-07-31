package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.shipment.ShipmentResponse;
import com.BatWoman.BatWoman_backend.dto.shipment.TrackingResponse;
import com.BatWoman.BatWoman_backend.dto.shipment.UpdateShipmentRequest;
import com.BatWoman.BatWoman_backend.service.ShipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ShipmentController {

    private final ShipmentService shipmentService;

    // ==========================================
    // Admin APIs
    // ==========================================

    @GetMapping("/admin/shipments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ShipmentResponse>> getAllShipments() {

        return ResponseEntity.ok(
                shipmentService.getAllShipments()
        );
    }

    @GetMapping("/admin/shipments/{shipmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentResponse> getShipment(
            @PathVariable UUID shipmentId) {

        return ResponseEntity.ok(
                shipmentService.getShipment(shipmentId)
        );
    }

    @GetMapping("/admin/orders/{orderId}/shipment")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentResponse> getShipmentByOrder(
            @PathVariable UUID orderId) {

        return ResponseEntity.ok(
                shipmentService.getShipmentByOrder(orderId)
        );
    }

    @PutMapping("/admin/shipments/{shipmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShipmentResponse> updateShipment(
            @PathVariable UUID shipmentId,
            @Valid @RequestBody UpdateShipmentRequest request) {

        return ResponseEntity.ok(
                shipmentService.updateShipment(
                        shipmentId,
                        request
                )
        );
    }

    // ==========================================
    // Customer APIs
    // ==========================================

    @GetMapping("/customer/orders/{orderId}/tracking")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TrackingResponse> getTracking(
            @PathVariable UUID orderId) {

        return ResponseEntity.ok(
                shipmentService.getTracking(orderId)
        );
    }

}
