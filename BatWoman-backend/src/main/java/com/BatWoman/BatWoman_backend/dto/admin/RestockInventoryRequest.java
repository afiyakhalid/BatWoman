package com.BatWoman.BatWoman_backend.dto.admin;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record RestockInventoryRequest(

        @NotNull
        UUID variantId,

        @NotNull
        @Min(1)
        Integer quantity

) {
}