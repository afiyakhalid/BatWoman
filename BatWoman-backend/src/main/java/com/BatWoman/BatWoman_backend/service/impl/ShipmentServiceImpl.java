package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.shipment.ShipmentResponse;
import com.BatWoman.BatWoman_backend.dto.shipment.TrackingResponse;
import com.BatWoman.BatWoman_backend.dto.shipment.UpdateShipmentRequest;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.mapper.ShipmentMapper;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.repository.ShipmentRepository;
import com.BatWoman.BatWoman_backend.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ShipmentServiceImpl implements ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final OrderRepository orderRepository;
    private final ShipmentMapper shipmentMapper;

    @Override
    public ShipmentResponse createShipment(Order order) {
        shipmentRepository.findByOrder(order)
                .ifPresent(shipment -> {
                    throw new ValidationException("Shipment already exists for this order.");
                });

        Shipment shipment = Shipment.builder()
                .order(order)
                .status(ShipmentStatus.PENDING)
                .build();

        Shipment savedShipment = shipmentRepository.save(shipment);
        return shipmentMapper.toShipmentResponse(savedShipment);
    }

    @Override
    @Transactional(readOnly = true)
    public ShipmentResponse getShipment(UUID shipmentId) {
        Shipment shipment = getShipmentEntity(shipmentId);
        return shipmentMapper.toShipmentResponse(shipment);
    }

    @Override
    @Transactional(readOnly = true)
    public ShipmentResponse getShipmentByOrder(UUID orderId) {
        Order order = getOrderEntity(orderId);

        Shipment shipment = shipmentRepository.findByOrder(order)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found for this order."));

        return shipmentMapper.toShipmentResponse(shipment);
    }

    @Override
    @Transactional(readOnly = true)
    public TrackingResponse getTracking(UUID orderId) {
        Order order = getOrderEntity(orderId);

        Shipment shipment = shipmentRepository.findByOrder(order)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found for this order."));

        return shipmentMapper.toTrackingResponse(shipment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShipmentResponse> getAllShipments() {
        return shipmentRepository.findAll()
                .stream()
                .map(shipmentMapper::toShipmentResponse)
                .toList();
    }

    @Override
    public ShipmentResponse updateShipment(UUID shipmentId, UpdateShipmentRequest request) {
        Shipment shipment = getShipmentEntity(shipmentId);

        shipment.setStatus(request.status());
        shipment.setCarrier(request.carrier());
        shipment.setTrackingNumber(request.trackingNumber());
        shipment.setTrackingUrl(request.trackingUrl());
        shipment.setExpectedDelivery(request.expectedDelivery());

        if (request.status() == ShipmentStatus.SHIPPED && shipment.getShippedAt() == null) {
            shipment.setShippedAt(OffsetDateTime.now());
        }

        if (request.status() == ShipmentStatus.DELIVERED && shipment.getDeliveredAt() == null) {
            shipment.setDeliveredAt(OffsetDateTime.now());
        }

        Shipment updatedShipment = shipmentRepository.save(shipment);
        return shipmentMapper.toShipmentResponse(updatedShipment);
    }

    // ==========================================
    // Private Helper Methods
    // ==========================================

    private Shipment getShipmentEntity(UUID shipmentId) {
        return shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipment not found."));
    }

    private Order getOrderEntity(UUID orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found."));
    }
}