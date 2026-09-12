package com.BatWoman.BatWoman_backend.dto.product;

import java.util.UUID;

public record ProductVariantResponse(

        UUID id,

        UUID sizeId,

        String size,

        Integer numericSize,

        UUID colorId,

        String color,

        String colorCode,

        String colorHexCode,

        String sku,

        Boolean active,

        Integer availableQuantity,

        Integer reservedQuantity,

        Integer totalQuantity

) {
}