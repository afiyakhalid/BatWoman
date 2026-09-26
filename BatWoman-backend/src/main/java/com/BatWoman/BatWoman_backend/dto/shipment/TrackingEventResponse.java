package com.BatWoman.BatWoman_backend.dto.shipment;

import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record TrackingEventResponse(
        ShipmentStatus status,
        String description,
        String location,
        BigDecimal latitude,
        BigDecimal longitude,
        OffsetDateTime eventTime
) {
}