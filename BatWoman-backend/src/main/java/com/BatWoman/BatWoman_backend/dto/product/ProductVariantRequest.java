package com.BatWoman.BatWoman_backend.dto.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ProductVariantRequest(

        @NotNull
        UUID sizeId,

        @NotNull
        UUID colorId,

        @NotBlank
        String sku,

        @NotNull
        @Min(0)
        Integer initialStock

) {
}