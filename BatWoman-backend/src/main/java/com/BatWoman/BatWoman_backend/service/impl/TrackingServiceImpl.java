package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.shipping.TrackingEventResponse;
import com.BatWoman.BatWoman_backend.dto.shipping.TrackingResponse;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.entity.ShipmentTrackingEvent;
import com.BatWoman.BatWoman_backend.repository.ShipmentRepository;
import com.BatWoman.BatWoman_backend.repository.ShipmentTrackingEventRepository;
import com.BatWoman.BatWoman_backend.service.TrackingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TrackingServiceImpl implements TrackingService {

    private final ShipmentRepository shipmentRepository;

    private final ShipmentTrackingEventRepository trackingEventRepository;

    @Override
    public TrackingResponse getTrackingByShipmentId(
            UUID shipmentId
    ) {

        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found."
                        )
                );

        return buildTrackingResponse(shipment);
    }

    @Override
    public TrackingResponse getTrackingByOrderId(
            UUID orderId
    ) {

        Shipment shipment = shipmentRepository
                .findByOrder_Id(orderId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found for this order."
                        )
                );

        return buildTrackingResponse(shipment);
    }

    @Override
    public TrackingResponse getTrackingByNumber(
            String trackingNumber
    ) {

        Shipment shipment = shipmentRepository
                .findByTrackingNumber(trackingNumber)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found for this tracking number."
                        )
                );

        return buildTrackingResponse(shipment);
    }

    private TrackingResponse buildTrackingResponse(
            Shipment shipment
    ) {

        List<ShipmentTrackingEvent> events =
                trackingEventRepository
                        .findByShipment_IdOrderByEventTimeAsc(
                                shipment.getId()
                        );

        List<TrackingEventResponse> eventResponses =
                events.stream()
                        .map(this::toEventResponse)
                        .toList();

        return new TrackingResponse(
                shipment.getId(),
                shipment.getOrder().getId(),
                shipment.getOrder().getOrderNumber(),
                shipment.getStatus(),
                shipment.getCarrier(),
                shipment.getTrackingNumber(),
                shipment.getTrackingUrl(),
                shipment.getExpectedDelivery(),
                eventResponses
        );
    }

    private TrackingEventResponse toEventResponse(
            ShipmentTrackingEvent event
    ) {

        return new TrackingEventResponse(
                event.getId(),
                event.getStatus(),
                event.getDescription(),
                event.getLocation(),
                event.getLatitude(),
                event.getLongitude(),
                event.getEventTime()
        );
    }
}