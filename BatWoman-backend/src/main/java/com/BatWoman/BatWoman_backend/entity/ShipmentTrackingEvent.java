package com.BatWoman.BatWoman_backend.entity;

import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "shipment_tracking_events",
        indexes = {
                @Index(
                        name = "idx_tracking_events_shipment_id",
                        columnList = "shipment_id"
                ),
                @Index(
                        name = "idx_tracking_events_event_time",
                        columnList = "event_time"
                ),
                @Index(
                        name = "idx_tracking_events_external_event_id",
                        columnList = "external_event_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentTrackingEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "shipment_id",
            nullable = false
    )
    private Shipment shipment;

    @Column(
            name = "external_event_id",
            length = 150
    )
    private String externalEventId;

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 40
    )
    private ShipmentStatus status;

    @Column(length = 500)
    private String description;

    @Column(length = 255)
    private String location;

    @Column(
            precision = 10,
            scale = 7
    )
    private BigDecimal latitude;

    @Column(
            precision = 10,
            scale = 7
    )
    private BigDecimal longitude;

    @Column(
            name = "event_time",
            nullable = false
    )
    private OffsetDateTime eventTime;

    @Column(
            name = "raw_payload",
            columnDefinition = "TEXT"
    )
    private String rawPayload;

    @Column(
            name = "created_at",
            nullable = false
    )
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {

        if (createdAt == null) {
            createdAt = OffsetDateTime.now();
        }
    }
}