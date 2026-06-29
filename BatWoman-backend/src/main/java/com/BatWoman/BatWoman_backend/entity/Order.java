package com.BatWoman.BatWoman_backend.entity;

import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;

    // ==========================================
    // User (Nullable for Guest Checkout)
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // ==========================================
    // Shipping Address
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    // ==========================================
    // Order Details
    // ==========================================

    @Column(name = "order_number", nullable = false, unique = true)
    private String orderNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    // ==========================================
    // Guest Checkout
    // ==========================================

    @Column(name = "guest_name")
    private String guestName;

    @Column(name = "guest_email")
    private String guestEmail;

    @Column(name = "guest_phone")
    private String guestPhone;

    // ==========================================
    // Pricing
    // ==========================================

    @Column(nullable = false)
    private BigDecimal subtotal;

    @Column(name = "shipping_charge", nullable = false)
    private BigDecimal shippingCharge;

    @Column(nullable = false)
    private BigDecimal discount;

    @Column(name = "total", nullable = false)
    private BigDecimal total;

    // ==========================================
    // Additional Information
    // ==========================================

    @Column(name = "notes")
    private String notes;

    // ==========================================
    // Audit Fields
    // ==========================================

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // ==========================================
    // Relationships
    // ==========================================

    @OneToMany(
            mappedBy = "order",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> orderItems;

    @OneToOne(
            mappedBy = "order",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private Payment payment;
}