package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.shipping.CreateShipmentRequest;
import com.BatWoman.BatWoman_backend.dto.shipping.ShipmentResponse;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.repository.ShipmentRepository;
import com.BatWoman.BatWoman_backend.service.ShippingService;
import com.BatWoman.BatWoman_backend.service.shipping.ShippingProviderClient;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ShippingServiceImpl implements ShippingService {

    private final ShipmentRepository shipmentRepository;

    private final OrderRepository orderRepository;

    private final ShippingProviderClient shippingProviderClient;

    @Override
    public ShipmentResponse createShipment(
            CreateShipmentRequest request
    ) {

        Order order = orderRepository.findById(request.orderId())
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Order not found."
                        )
                );

        if (shipmentRepository.existsByOrder_Id(order.getId())) {
            throw new IllegalStateException(
                    "A shipment already exists for this order."
            );
        }

        Shipment shipment = Shipment.builder()
                .order(order)
                .status(ShipmentStatus.CREATED)
                .build();

        shipment = shipmentRepository.save(shipment);

        /*
         * Phase 1:
         * Persist the shipment locally.
         *
         * Phase 2:
         * This will call Shiprocket and populate:
         * carrier
         * trackingNumber
         * trackingUrl
         * expectedDelivery
         */
        shippingProviderClient.createShipment(
                order,
                shipment
        );

        return toResponse(shipment);
    }

    @Override
    @Transactional(readOnly = true)
    public ShipmentResponse getShipmentById(
            UUID shipmentId
    ) {

        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found."
                        )
                );

        return toResponse(shipment);
    }

    @Override
    @Transactional(readOnly = true)
    public ShipmentResponse getShipmentByOrderId(
            UUID orderId
    ) {

        Shipment shipment = shipmentRepository
                .findByOrder_Id(orderId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found for this order."
                        )
                );

        return toResponse(shipment);
    }

    @Override
    public ShipmentResponse updateShipmentStatus(
            UUID shipmentId,
            String status
    ) {

        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found."
                        )
                );

        ShipmentStatus shipmentStatus;

        try {
            shipmentStatus =
                    ShipmentStatus.valueOf(
                            status.trim().toUpperCase()
                    );
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(
                    "Invalid shipment status: " + status
            );
        }

        shipment.setStatus(shipmentStatus);

        shipment = shipmentRepository.save(shipment);

        return toResponse(shipment);
    }

    private ShipmentResponse toResponse(
            Shipment shipment
    ) {

        Order order = shipment.getOrder();

        return new ShipmentResponse(
                shipment.getId(),
                order.getId(),
                order.getOrderNumber(),
                shipment.getStatus(),
                shipment.getCarrier(),
                shipment.getTrackingNumber(),
                shipment.getTrackingUrl(),
                shipment.getExpectedDelivery(),
                shipment.getShippedAt(),
                shipment.getDeliveredAt(),
                shipment.getCreatedAt(),
                shipment.getUpdatedAt()
        );
    }
}