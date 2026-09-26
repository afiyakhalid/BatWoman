package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.ShipmentTrackingEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ShipmentTrackingEventRepository
        extends JpaRepository<ShipmentTrackingEvent, UUID> {

    boolean existsByShipment_IdAndExternalEventId(
            UUID shipmentId,
            String externalEventId
    );
    List<ShipmentTrackingEvent> findByShipment_IdOrderByEventTimeDesc(
            UUID shipmentId
    );
}