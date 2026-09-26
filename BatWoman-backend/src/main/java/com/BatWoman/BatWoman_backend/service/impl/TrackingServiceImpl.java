package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.shipment.TrackingEventResponse;
import com.BatWoman.BatWoman_backend.dto.shipment.TrackingResponse;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.repository.ShipmentRepository;
import com.BatWoman.BatWoman_backend.repository.ShipmentTrackingEventRepository;
import com.BatWoman.BatWoman_backend.service.TrackingService;
import com.BatWoman.BatWoman_backend.service.shipping.ShippingProviderClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TrackingServiceImpl implements TrackingService {

    private final ShipmentRepository shipmentRepository;
    private final ShippingProviderClient shippingProviderClient;
    private final ShipmentTrackingEventRepository trackingEventRepository;

    // =========================================================
    // TRACK BY SHIPMENT ID
    // =========================================================

    @Override
    public TrackingResponse getTrackingByShipmentId(UUID shipmentId) {

        Shipment shipment = shipmentRepository
                .findById(shipmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Shipment not found."
                        )
                );

        refreshTracking(shipment);

        return toResponse(shipment);
    }

    // =========================================================
    // TRACK BY ORDER ID
    // =========================================================

    @Override
    public TrackingResponse getTrackingByOrderId(UUID orderId) {

        Shipment shipment = shipmentRepository
                .findByOrder_Id(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Shipment not found for order."
                        )
                );

        refreshTracking(shipment);

        return toResponse(shipment);
    }

    // =========================================================
    // GET TRACKING EVENTS BY ORDER ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<TrackingEventResponse> getTrackingEventsByOrderId(
            UUID orderId
    ) {

        Shipment shipment = shipmentRepository
                .findByOrder_Id(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Shipment not found for order."
                        )
                );

        return trackingEventRepository
                .findByShipment_IdOrderByEventTimeDesc(
                        shipment.getId()
                )
                .stream()
                .map(event -> new TrackingEventResponse(
                        event.getStatus(),
                        event.getDescription(),
                        event.getLocation(),
                        event.getLatitude(),
                        event.getLongitude(),
                        event.getEventTime()
                ))
                .toList();
    }

    // =========================================================
    // TRACK BY AWB / TRACKING NUMBER
    // =========================================================

    @Override
    public TrackingResponse getTrackingByNumber(
            String trackingNumber
    ) {

        if (trackingNumber == null
                || trackingNumber.isBlank()) {

            throw new IllegalArgumentException(
                    "Tracking number is required."
            );
        }

        Shipment shipment = shipmentRepository
                .findByTrackingNumber(trackingNumber)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Shipment not found for tracking number."
                        )
                );

        refreshTracking(shipment);

        return toResponse(shipment);
    }

    // =========================================================
    // REFRESH FROM SHIPROCKET
    // =========================================================

    private void refreshTracking(
            Shipment shipment
    ) {

        /*
         * A shipment cannot be tracked through Shiprocket
         * until it has an AWB/tracking number.
         *
         * This is expected for:
         *
         * PENDING
         * PROCESSING without AWB
         *
         * especially while Shiprocket AWB assignment is pending.
         */
        if (shipment.getTrackingNumber() == null
                || shipment.getTrackingNumber().isBlank()) {

            log.info(
                    "Shipment {} does not have an AWB yet. " +
                            "Returning current local shipment state.",
                    shipment.getId()
            );

            return;
        }

        try {

            /*
             * The existing ShiprocketShippingProviderClient
             * handles the actual Shiprocket tracking API call.
             *
             * It updates:
             * - status
             * - AWB
             * - carrier
             * - tracking URL
             * - expected delivery
             * - shippedAt
             * - deliveredAt
             */
            shippingProviderClient.updateTracking(
                    shipment
            );

        } catch (Exception ex) {

            /*
             * Do not destroy the tracking response merely because
             * Shiprocket is temporarily unavailable.
             *
             * The latest locally stored shipment information
             * can still be returned.
             */
            log.error(
                    "Unable to refresh tracking from Shiprocket " +
                            "for shipment {}. Returning last known state.",
                    shipment.getId(),
                    ex
            );
        }
    }

    // =========================================================
    // ENTITY -> RESPONSE
    // =========================================================

    private TrackingResponse toResponse(
            Shipment shipment
    ) {

        return new TrackingResponse(
                shipment.getStatus(),
                shipment.getCarrier(),
                shipment.getTrackingNumber(),
                shipment.getTrackingUrl(),
                shipment.getExpectedDelivery(),
                shipment.getShippedAt(),
                shipment.getDeliveredAt()
        );
    }
}