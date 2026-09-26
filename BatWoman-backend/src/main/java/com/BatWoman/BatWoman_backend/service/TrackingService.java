package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.shipment.TrackingEventResponse;
import com.BatWoman.BatWoman_backend.dto.shipment.TrackingResponse;

import java.util.List;
import java.util.UUID;

public interface TrackingService {

    TrackingResponse getTrackingByShipmentId(UUID shipmentId);

    TrackingResponse getTrackingByOrderId(UUID orderId);

    TrackingResponse getTrackingByNumber(String trackingNumber);
    List<TrackingEventResponse> getTrackingEventsByOrderId(
            UUID orderId
    );
}