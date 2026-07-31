package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.shipment.ShipmentResponse;
import com.BatWoman.BatWoman_backend.dto.shipment.TrackingResponse;
import com.BatWoman.BatWoman_backend.dto.shipment.UpdateShipmentRequest;
import com.BatWoman.BatWoman_backend.entity.Order;

import java.util.List;
import java.util.UUID;

public interface ShipmentService {

    /**
     * Creates a shipment automatically after a successful payment.
     */
    ShipmentResponse createShipment(Order order);

    /**
     * Returns a shipment by its ID.
     */
    ShipmentResponse getShipment(UUID shipmentId);

    /**
     * Returns the shipment associated with an order.
     */
    ShipmentResponse getShipmentByOrder(UUID orderId);

    /**
     * Returns tracking information for customers.
     */
    TrackingResponse getTracking(UUID orderId);

    /**
     * Returns all shipments.
     */
    List<ShipmentResponse> getAllShipments();

    /**
     * Updates shipment information.
     */
    ShipmentResponse updateShipment(
            UUID shipmentId,
            UpdateShipmentRequest request
    );

}
