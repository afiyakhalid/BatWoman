package com.BatWoman.BatWoman_backend.dto.admin;

public record AdminInventorySummaryResponse(

        long totalProducts,

        long availableUnits,

        long reservedUnits,

        long outOfStockProducts

) {
}
