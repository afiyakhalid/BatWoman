package com.BatWoman.BatWoman_backend.dto.admin;

import java.math.BigDecimal;

public record DashboardStatsResponse(

        BigDecimal totalRevenue,
        BigDecimal averageOrderValue,

        Long totalOrders,

        Long totalCustomers,

        Long totalProducts,

        Long lowStockProducts,

        Long outOfStockProducts

) {
}
