package com.BatWoman.BatWoman_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "colors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Color {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    // ===========================
    // Color Details
    // ===========================

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "hex_code", length = 7)
    private String hexCode;

    // ===========================
    // Display / Status
    // ===========================

    @Column(nullable = false)
    private Boolean active;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    // ===========================
    // Audit Fields
    // ===========================

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}