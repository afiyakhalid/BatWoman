package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.ShipmentTrackingEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ShipmentTrackingEventRepository
        extends JpaRepository<ShipmentTrackingEvent, UUID> {

    List<ShipmentTrackingEvent>
    findByShipment_IdOrderByEventTimeAsc(UUID shipmentId);

    boolean existsByExternalEventId(String externalEventId);
}