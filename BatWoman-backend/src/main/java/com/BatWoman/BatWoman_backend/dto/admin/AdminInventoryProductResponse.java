package com.BatWoman.BatWoman_backend.dto.admin;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record AdminInventoryProductResponse(

        UUID productId,

        String productName,

        Integer variantCount,

        Integer availableQuantity,

        Integer reservedQuantity,

        Integer totalQuantity,

        String status,

        OffsetDateTime updatedAt,

        List<AdminInventoryVariantResponse> variants

) {
}
