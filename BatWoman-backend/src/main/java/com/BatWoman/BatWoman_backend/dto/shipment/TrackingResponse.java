package com.BatWoman.BatWoman_backend.dto.shipment;

import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;

import java.time.OffsetDateTime;

public record TrackingResponse(

        ShipmentStatus status,

        String carrier,

        String trackingNumber,

        String trackingUrl,

        OffsetDateTime expectedDelivery,

        OffsetDateTime shippedAt,

        OffsetDateTime deliveredAt

) {
}