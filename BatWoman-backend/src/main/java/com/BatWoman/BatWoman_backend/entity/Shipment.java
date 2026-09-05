package com.BatWoman.BatWoman_backend.entity;

import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "shipments",
        indexes = {
                @Index(
                        name = "idx_shipments_order",
                        columnList = "order_id"
                ),
                @Index(
                        name = "idx_shipments_status",
                        columnList = "status"
                ),
                @Index(
                        name = "idx_shipments_tracking",
                        columnList = "tracking_number"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid")
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "order_id",
            nullable = false,
            unique = true
    )
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 30
    )
    private ShipmentStatus status;

    @Column(name = "carrier", length = 100)
    private String carrier;

    @Column(
            name = "tracking_number",
            length = 255,
            unique = true
    )
    private String trackingNumber;

    @Column(
            name = "tracking_url",
            columnDefinition = "TEXT"
    )
    private String trackingUrl;

    @Column(name = "expected_delivery")
    private OffsetDateTime expectedDelivery;

    @Column(name = "shipped_at")
    private OffsetDateTime shippedAt;

    @Column(name = "delivered_at")
    private OffsetDateTime deliveredAt;

    @Column(
            name = "created_at",
            nullable = false
    )
    private OffsetDateTime createdAt;

    @Column(
            name = "updated_at",
            nullable = false
    )
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {

        OffsetDateTime now = OffsetDateTime.now();

        if (createdAt == null) {
            createdAt = now;
        }

        if (updatedAt == null) {
            updatedAt = now;
        }

        if (status == null) {
            status = ShipmentStatus.CREATED;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }
}