package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ShipmentRepository
        extends JpaRepository<Shipment, UUID> {

    Optional<Shipment> findByOrder_Id(UUID orderId);

    Optional<Shipment> findByTrackingNumber(String trackingNumber);

    List<Shipment> findByStatus(ShipmentStatus status);

    boolean existsByOrder_Id(UUID orderId);

    boolean existsByTrackingNumber(String trackingNumber);
}