package com.BatWoman.BatWoman_backend.dto.admin;

import java.time.OffsetDateTime;
import java.util.UUID;

public record InventoryResponse(

        UUID inventoryId,

        UUID productId,

        String productName,

        Integer availableQuantity,

        Integer reservedQuantity,

        Integer totalQuantity,

        OffsetDateTime updatedAt

) {
}