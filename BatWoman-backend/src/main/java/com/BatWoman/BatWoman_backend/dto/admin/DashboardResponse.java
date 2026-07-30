package com.BatWoman.BatWoman_backend.dto.admin;

import java.util.List;





public record DashboardResponse(

        DashboardStatsResponse stats,

        List<MonthlyRevenueResponse> monthlyRevenue,

        OrderStatusAnalyticsResponse orderStatus,

        PaymentStatusAnalyticsResponse paymentStatus,

        InventoryAnalyticsResponse inventory,

        List<TopProductAnalyticsResponse> topProducts,

        List<RecentOrderResponse> recentOrders,

        List<RecentPaymentResponse> recentPayments

) {
}
