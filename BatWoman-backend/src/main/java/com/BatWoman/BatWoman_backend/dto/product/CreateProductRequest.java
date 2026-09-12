package com.BatWoman.BatWoman_backend.dto.product;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record CreateProductRequest(

        @NotNull
        UUID categoryId,

        @NotBlank
        String name,

        String description,

        String fabric,

        @NotNull
        BigDecimal price,

        BigDecimal discountPrice,

        Boolean featured,

        Boolean newArrival,

        @NotEmpty
        List<@Valid ProductVariantRequest> variants

) {
}