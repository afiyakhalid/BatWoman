package com.BatWoman.BatWoman_backend.dto.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record ProductCardResponse(

        UUID id,

        String name,

        String slug,

        BigDecimal price,

        BigDecimal discountPrice,

        CategorySummary category,

        List<ProductImageResponse> images

) {}
