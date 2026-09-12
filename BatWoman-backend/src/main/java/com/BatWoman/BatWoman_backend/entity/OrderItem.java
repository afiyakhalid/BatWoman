package com.BatWoman.BatWoman_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    // ===========================
    // Order
    // ===========================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // ===========================
    // Product
    // ===========================
    //
    // Retained because the database intentionally keeps
    // product_id for historical product identity.
    //

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // ===========================
    // Product Variant
    // ===========================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;

    // ===========================
    // Variant Snapshot
    // ===========================
    //
    // These values preserve what was purchased at the time
    // the order was created, even if the catalog changes later.
    //

    @Column(name = "variant_sku", nullable = false, length = 100)
    private String variantSku;

    @Column(nullable = false, length = 30)
    private String size;

    @Column(nullable = false, length = 100)
    private String color;

    // ===========================
    // Pricing
    // ===========================

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "subtotal", nullable = false)
    private BigDecimal subtotal;

    // ===========================
    // Audit
    // ===========================

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
}