package com.BatWoman.BatWoman_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "sizes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Size {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    // ===========================
    // Size Details
    // ===========================

    @Column(nullable = false, unique = true, length = 30)
    private String label;

    @Column(name = "numeric_value", nullable = false, unique = true)
    private Integer numericValue;

    // ===========================
    // Display / Status
    // ===========================

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    @Column(nullable = false)
    private Boolean active;

    // ===========================
    // Audit Fields
    // ===========================

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}