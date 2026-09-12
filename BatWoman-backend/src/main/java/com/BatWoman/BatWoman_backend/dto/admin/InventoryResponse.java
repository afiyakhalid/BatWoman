package com.BatWoman.BatWoman_backend.dto.admin;

import java.time.OffsetDateTime;
import java.util.UUID;

public record InventoryResponse(

        UUID inventoryId,

        UUID variantId,

        UUID productId,

        String productName,

        String sku,

        String size,

        String color,

        Integer availableQuantity,

        Integer reservedQuantity,

        Integer totalQuantity,

        OffsetDateTime updatedAt

) {
}