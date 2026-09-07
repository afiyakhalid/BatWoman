package com.BatWoman.BatWoman_backend.dto.shipping;

import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record TrackingEventResponse(

        UUID id,

        ShipmentStatus status,

        String description,

        String location,

        BigDecimal latitude,

        BigDecimal longitude,

        OffsetDateTime eventTime

) {
}