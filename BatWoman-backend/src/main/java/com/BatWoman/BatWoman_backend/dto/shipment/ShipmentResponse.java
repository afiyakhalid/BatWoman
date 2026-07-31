package com.BatWoman.BatWoman_backend.dto.shipment;

import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ShipmentResponse(

        UUID id,

        UUID orderId,

        ShipmentStatus status,

        String carrier,

        String trackingNumber,

        String trackingUrl,

        OffsetDateTime expectedDelivery,

        OffsetDateTime shippedAt,

        OffsetDateTime deliveredAt,

        OffsetDateTime createdAt,

        OffsetDateTime updatedAt

) {
}
