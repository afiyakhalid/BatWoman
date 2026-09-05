package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.shipping.TrackingResponse;

import java.util.UUID;

public interface TrackingService {

    TrackingResponse getTrackingByShipmentId(UUID shipmentId);

    TrackingResponse getTrackingByOrderId(UUID orderId);

    TrackingResponse getTrackingByNumber(String trackingNumber);
}
