package com.BatWoman.BatWoman_backend.dto.admin;

import com.BatWoman.BatWoman_backend.enums.InventoryAdjustmentType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AdjustInventoryRequest(

        @NotNull(message = "Variant ID is required.")
        UUID variantId,

        @NotNull(message = "Quantity is required.")
        @Min(value = 1, message = "Quantity must be at least 1.")
        Integer quantity,

        @NotNull(message = "Adjustment type is required.")
        InventoryAdjustmentType adjustmentType

) {
}