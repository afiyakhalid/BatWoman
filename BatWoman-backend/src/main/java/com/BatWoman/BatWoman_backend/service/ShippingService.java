package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.shipping.CreateShipmentRequest;
import com.BatWoman.BatWoman_backend.dto.shipping.ShipmentResponse;

import java.util.UUID;

public interface ShippingService {

    ShipmentResponse createShipment(CreateShipmentRequest request);

    ShipmentResponse getShipmentById(UUID shipmentId);

    ShipmentResponse getShipmentByOrderId(UUID orderId);

    ShipmentResponse updateShipmentStatus(
            UUID shipmentId,
            String status
    );
}