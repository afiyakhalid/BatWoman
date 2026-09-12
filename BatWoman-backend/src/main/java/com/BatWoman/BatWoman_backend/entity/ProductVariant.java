package com.BatWoman.BatWoman_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "product_variants",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_variant_product_size_color",
                        columnNames = {"product_id", "size_id", "color_id"}
                ),
                @UniqueConstraint(
                        name = "uq_variant_sku",
                        columnNames = {"sku"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariant {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    // ===========================
    // Product
    // ===========================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // ===========================
    // Size
    // ===========================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "size_id", nullable = false)
    private Size size;

    // ===========================
    // Color
    // ===========================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "color_id", nullable = false)
    private Color color;

    // ===========================
    // Variant Details
    // ===========================

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private Boolean active;

    // ===========================
    // Inventory
    // ===========================

    @OneToOne(
            mappedBy = "variant",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Inventory inventory;

    // ===========================
    // Audit Fields
    // ===========================

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}