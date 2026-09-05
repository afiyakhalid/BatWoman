package com.BatWoman.BatWoman_backend.dto.shipping;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record ShippingWebhookRequest(

        @NotBlank(message = "Tracking number is required.")
        String trackingNumber,

        @NotBlank(message = "Status is required.")
        String status,

        String description,

        String location,

        BigDecimal latitude,

        BigDecimal longitude,

        OffsetDateTime eventTime,

        String externalEventId

) {
}