package com.BatWoman.BatWoman_backend.dto.shipment;

import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public record UpdateShipmentRequest(

        @NotNull
        ShipmentStatus status,

        String carrier,

        String trackingNumber,

        String trackingUrl,

        OffsetDateTime expectedDelivery

) {
}
