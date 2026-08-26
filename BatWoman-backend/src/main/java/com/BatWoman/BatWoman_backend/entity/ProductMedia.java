package com.BatWoman.BatWoman_backend.entity;

import com.BatWoman.BatWoman_backend.enums.MediaType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "product_media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductMedia {

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
    // Media Information
    // ===========================

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaType mediaType;

    @Column(name = "object_key", nullable = false)
    private String objectKey;

    @Column(name = "media_url", nullable = false, columnDefinition = "TEXT")
    private String mediaUrl;

    @Column(name = "alt_text")
    private String altText;

    @Column(name = "is_primary", nullable = false)
    private Boolean primaryMedia;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    // ===========================
    // Audit
    // ===========================

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
}