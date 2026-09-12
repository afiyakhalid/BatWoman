package com.BatWoman.BatWoman_backend.dto.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ProductDetailResponse(

        UUID id,

        String name,

        String slug,

        String description,

        String fabric,

        BigDecimal price,

        BigDecimal discountPrice,

        Integer availableQuantity,

        List<ProductVariantResponse> variants,

        List<ProductMediaResponse> media

) {
}