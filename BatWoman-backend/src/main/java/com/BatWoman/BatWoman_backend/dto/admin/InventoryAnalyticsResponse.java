package com.BatWoman.BatWoman_backend.dto.admin;

public record InventoryAnalyticsResponse(

        Long healthy,

        Long lowStock,

        Long outOfStock

) {
}
