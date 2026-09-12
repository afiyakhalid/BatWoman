package com.BatWoman.BatWoman_backend.dto.product;

import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record UpdateProductRequest(

        UUID categoryId,

        String name,

        String description,

        String fabric,

        BigDecimal price,

        BigDecimal discountPrice,

        Boolean featured,

        Boolean newArrival,

        Boolean active,

        @Valid
        List<UpdateProductVariantRequest> variants

) {
}