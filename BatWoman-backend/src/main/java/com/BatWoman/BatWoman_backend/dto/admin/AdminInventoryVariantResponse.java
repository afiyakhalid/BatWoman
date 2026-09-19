package com.BatWoman.BatWoman_backend.dto.admin;

import java.time.OffsetDateTime;
import java.util.UUID;

public record AdminInventoryVariantResponse(

        UUID inventoryId,

        UUID variantId,

        String sku,

        String size,

        String color,

        Integer availableQuantity,

        Integer reservedQuantity,

        Integer totalQuantity,

        OffsetDateTime updatedAt

) {
}