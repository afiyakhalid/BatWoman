
package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.config.ShiprocketConfig;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.entity.ShipmentTrackingEvent;
import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import com.BatWoman.BatWoman_backend.repository.ShipmentRepository;
import com.BatWoman.BatWoman_backend.repository.ShipmentTrackingEventRepository;
import com.BatWoman.BatWoman_backend.service.ShiprocketWebhookService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HexFormat;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShiprocketWebhookServiceImpl
        implements ShiprocketWebhookService {

    private final ObjectMapper objectMapper;
    private final ShipmentRepository shipmentRepository;
    private final ShipmentTrackingEventRepository trackingEventRepository;
    private final ShiprocketConfig shiprocketConfig;

    private static final DateTimeFormatter SHIPROCKET_DATE_FORMAT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    @Transactional
    public void processTrackingWebhook(
            String payload,
            String apiKey
    ) {

        validateApiKey(apiKey);

        try {

            JsonNode root =
                    objectMapper.readTree(payload);

            String awb =
                    getText(root, "awb");

            if (awb == null || awb.isBlank()) {

                throw new IllegalArgumentException(
                        "Shiprocket webhook does not contain AWB."
                );
            }

            Shipment shipment =
                    shipmentRepository
                            .findByTrackingNumber(awb)
                            .orElseThrow(() ->
                                    new IllegalArgumentException(
                                            "No BatWoman shipment found for AWB: "
                                                    + awb
                                    )
                            );

            /*
             * Update current shipment information.
             */

            String courierName =
                    getText(root, "courier_name");

            if (courierName != null &&
                    !courierName.isBlank()) {

                shipment.setCarrier(courierName);
            }

            String etd =
                    getText(root, "etd");

            OffsetDateTime expectedDelivery =
                    parseDate(etd);

            if (expectedDelivery != null) {

                shipment.setExpectedDelivery(
                        expectedDelivery
                );
            }

            /*
             * Process tracking scans.
             */

            JsonNode scans =
                    root.path("scans");

            if (scans.isArray()) {

                for (JsonNode scan : scans) {

                    processScan(
                            shipment,
                            scan,
                            payload,
                            awb
                    );
                }
            }

            /*
             * Process current shipment status.
             */

            String currentStatus =
                    getText(
                            root,
                            "current_status"
                    );

            if (currentStatus == null ||
                    currentStatus.isBlank()) {

                currentStatus =
                        getText(
                                root,
                                "shipment_status"
                        );
            }

            ShipmentStatus mappedStatus =
                    mapStatus(currentStatus);

            if (mappedStatus != null) {

                updateShipmentStatus(
                        shipment,
                        mappedStatus
                );
            }

            shipmentRepository.save(shipment);

            log.info(
                    "Shiprocket webhook processed successfully. AWB={}, status={}",
                    awb,
                    currentStatus
            );

        } catch (Exception exception) {

            log.error(
                    "Failed to process Shiprocket webhook.",
                    exception
            );

            throw new IllegalArgumentException(
                    "Invalid Shiprocket webhook payload.",
                    exception
            );
        }
    }

    private void processScan(
            Shipment shipment,
            JsonNode scan,
            String rawPayload,
            String awb
    ) {

        String date =
                getText(scan, "date");

        String statusCode =
                getText(scan, "status");

        String activity =
                getText(scan, "activity");

        String location =
                getText(scan, "location");

        String srStatusLabel =
                getText(
                        scan,
                        "sr-status-label"
                );

        /*
         * Prefer Shiprocket's human-readable status
         * when available.
         */
        String effectiveStatus;

        if (srStatusLabel != null &&
                !srStatusLabel.isBlank() &&
                !"NA".equalsIgnoreCase(srStatusLabel)) {

            effectiveStatus = srStatusLabel;

        } else {

            effectiveStatus = statusCode;
        }

        ShipmentStatus mappedStatus =
                mapStatus(effectiveStatus);

        /*
         * Your ShipmentTrackingEvent.status is an enum,
         * so if Shiprocket gives us a status that we don't
         * understand, we cannot save it as an event.
         */
        if (mappedStatus == null) {

            log.warn(
                    "Ignoring unsupported Shiprocket tracking status. AWB={}, status={}",
                    awb,
                    effectiveStatus
            );

            return;
        }

        OffsetDateTime eventTime =
                parseDate(date);

        if (eventTime == null) {

            eventTime =
                    OffsetDateTime.now();
        }

        String externalEventId =
                generateEventId(
                        awb,
                        date,
                        effectiveStatus,
                        activity,
                        location
                );

        /*
         * Prevent duplicate webhook events.
         */

        if (trackingEventRepository
                .existsByShipment_IdAndExternalEventId(
                        shipment.getId(),
                        externalEventId
                )) {

            log.debug(
                    "Duplicate tracking event ignored. AWB={}, eventId={}",
                    awb,
                    externalEventId
            );

            return;
        }

        BigDecimal latitude =
                getDecimal(
                        scan,
                        "latitude"
                );

        BigDecimal longitude =
                getDecimal(
                        scan,
                        "longitude"
                );

        ShipmentTrackingEvent event =
                ShipmentTrackingEvent.builder()
                        .shipment(shipment)
                        .externalEventId(
                                externalEventId
                        )
                        .status(mappedStatus)
                        .description(activity)
                        .location(location)
                        .latitude(latitude)
                        .longitude(longitude)
                        .eventTime(eventTime)
                        .rawPayload(rawPayload)
                        .build();

        trackingEventRepository.save(event);

        /*
         * Also update the shipment's current state.
         */
        updateShipmentStatus(
                shipment,
                mappedStatus
        );
    }

    private void updateShipmentStatus(
            Shipment shipment,
            ShipmentStatus newStatus
    ) {

        ShipmentStatus currentStatus =
                shipment.getStatus();

        /*
         * Delivered is terminal for the normal flow.
         */
        if (currentStatus ==
                ShipmentStatus.DELIVERED) {

            return;
        }

        shipment.setStatus(newStatus);

        if (newStatus ==
                ShipmentStatus.SHIPPED &&
                shipment.getShippedAt() == null) {

            shipment.setShippedAt(
                    OffsetDateTime.now()
            );
        }

        if (newStatus ==
                ShipmentStatus.DELIVERED &&
                shipment.getDeliveredAt() == null) {

            shipment.setDeliveredAt(
                    OffsetDateTime.now()
            );
        }
    }

    private ShipmentStatus mapStatus(
            String shiprocketStatus
    ) {

        if (shiprocketStatus == null ||
                shiprocketStatus.isBlank()) {

            return null;
        }

        String status =
                shiprocketStatus
                        .trim()
                        .toUpperCase()
                        .replace("_", " ");

        return switch (status) {

            /*
             * Processing
             */

            case "AWB ASSIGNED",
                 "LABEL GENERATED",
                 "SHIPMENT BOOKED" ->
                    ShipmentStatus.PROCESSING;

            /*
             * Packed
             */

            case "PACKED",
                 "PICKUP SCHEDULED",
                 "PICKUP GENERATED",
                 "MANIFEST GENERATED",
                 "READY TO SHIP" ->
                    ShipmentStatus.PACKED;

            /*
             * Shipped
             *
             * Shiprocket documents statuses such as
             * SHIPPED, IN TRANSIT and PICKED UP.
             */

            case "SHIPPED",
                 "IN TRANSIT",
                 "PICKED UP",
                 "REACHED AT DESTINATION",
                 "REACHED AT DESTINATION HUB" ->
                    ShipmentStatus.SHIPPED;

            /*
             * Out for delivery
             */

            case "OUT FOR DELIVERY" ->
                    ShipmentStatus.OUT_FOR_DELIVERY;

            /*
             * Delivered
             */

            case "DELIVERED",
                 "FULFILLED" ->
                    ShipmentStatus.DELIVERED;

            /*
             * Returned / RTO
             */

            case "RTO INITIATED",
                 "RTO IN TRANSIT",
                 "RTO IN INTRANSIT",
                 "RTO DELIVERED",
                 "RTO NDR",
                 "RETURNED",
                 "RETURN" ->
                    ShipmentStatus.RETURNED;

            /*
             * Cancelled
             */

            case "CANCELLED",
                 "CANCELED",
                 "CANCELLED BEFORE DISPATCHED" ->
                    ShipmentStatus.CANCELLED;

            /*
             * These are valid Shiprocket statuses but
             * we don't currently have equivalent values
             * in ShipmentStatus.
             */

            case "UNDELIVERED",
                 "DELAYED",
                 "PICKUP ERROR",
                 "PICKUP EXCEPTION",
                 "PICKUP RESCHEDULED",
                 "OUT FOR PICKUP",
                 "NDR",
                 "DAMAGED",
                 "LOST",
                 "MISROUTED" -> null;

            default -> {

                log.warn(
                        "Unknown Shiprocket status received: {}",
                        shiprocketStatus
                );

                yield null;
            }
        };
    }

    private void validateApiKey(
            String apiKey
    ) {

        String configuredToken =
                shiprocketConfig.getWebhookToken();

        if (configuredToken == null ||
                configuredToken.isBlank()) {

            throw new IllegalStateException(
                    "Shiprocket webhook token is not configured."
            );
        }

        if (apiKey == null ||
                !MessageDigest.isEqual(
                        configuredToken.getBytes(
                                StandardCharsets.UTF_8
                        ),
                        apiKey.getBytes(
                                StandardCharsets.UTF_8
                        )
                )) {

            throw new SecurityException(
                    "Invalid Shiprocket webhook API key."
            );
        }
    }

    private String getText(
            JsonNode node,
            String field
    ) {

        JsonNode value =
                node.get(field);

        if (value == null ||
                value.isNull()) {

            return null;
        }

        String text =
                value.asText();

        return text == null ||
                text.isBlank()
                ? null
                : text.trim();
    }

    private BigDecimal getDecimal(
            JsonNode node,
            String field
    ) {

        String value =
                getText(node, field);

        if (value == null) {
            return null;
        }

        try {

            return new BigDecimal(value);

        } catch (NumberFormatException exception) {

            return null;
        }
    }

    private OffsetDateTime parseDate(
            String value
    ) {

        if (value == null ||
                value.isBlank() ||
                "NA".equalsIgnoreCase(value)) {

            return null;
        }

        /*
         * ISO-8601.
         */
        try {

            return OffsetDateTime.parse(value);

        } catch (DateTimeParseException ignored) {
        }

        /*
         * Shiprocket commonly sends:
         *
         * yyyy-MM-dd HH:mm:ss
         */
        try {

            return LocalDateTime
                    .parse(
                            value,
                            SHIPROCKET_DATE_FORMAT
                    )
                    .atOffset(
                            ZoneOffset.UTC
                    );

        } catch (DateTimeParseException exception) {

            log.warn(
                    "Could not parse Shiprocket date: {}",
                    value
            );

            return null;
        }
    }

    private String generateEventId(
            String awb,
            String date,
            String status,
            String activity,
            String location
    ) {

        String source =
                String.join(
                        "|",
                        safe(awb),
                        safe(date),
                        safe(status),
                        safe(activity),
                        safe(location)
                );

        try {

            MessageDigest digest =
                    MessageDigest.getInstance(
                            "SHA-256"
                    );

            byte[] hash =
                    digest.digest(
                            source.getBytes(
                                    StandardCharsets.UTF_8
                            )
                    );

            return HexFormat
                    .of()
                    .formatHex(hash);

        } catch (Exception exception) {

            throw new IllegalStateException(
                    "Could not generate tracking event ID.",
                    exception
            );
        }
    }

    private String safe(String value) {
        return value == null ? "" : value;
    }
}