package com.BatWoman.BatWoman_backend.dto.shipping;

import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record TrackingResponse(

        UUID shipmentId,

        UUID orderId,

        String orderNumber,

        ShipmentStatus currentStatus,

        String carrier,

        String trackingNumber,

        String trackingUrl,

        OffsetDateTime expectedDelivery,

        List<TrackingEventResponse> events

) {
}