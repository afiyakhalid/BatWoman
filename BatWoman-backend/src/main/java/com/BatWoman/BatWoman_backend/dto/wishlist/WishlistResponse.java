package com.BatWoman.BatWoman_backend.dto.wishlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistResponse {

    private UUID id;

    private ProductWishlistResponse product;

    private OffsetDateTime createdAt;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductWishlistResponse {

        private UUID id;

        private String name;

        private String slug;

        private BigDecimal price;

        private BigDecimal discountPrice;

        private Boolean active;

        private Boolean featured;

        private Boolean newArrival;

        private List<ProductMediaResponse> media;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductMediaResponse {

        private UUID id;

        private String mediaType;

        private String objectKey;

        private String mediaUrl;

        private String altText;

        private Boolean primaryMedia;

        private Integer displayOrder;

        private OffsetDateTime createdAt;
    }
}