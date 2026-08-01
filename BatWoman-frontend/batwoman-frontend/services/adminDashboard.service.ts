import api from "@/lib/axios";

// ============================================
// Dashboard Stats
// ============================================

export interface DashboardStats {

    totalRevenue: number;

    averageOrderValue: number;

    totalOrders: number;

    totalCustomers: number;

    totalProducts: number;

    lowStockProducts: number;

    outOfStockProducts: number;

}

// ============================================
// Monthly Revenue
// ============================================

export interface MonthlyRevenue {

    month: string;

    revenue: number;

}

// ============================================
// Order Status Analytics
// ============================================

export interface OrderStatusAnalytics {

    pending: number;

    paid: number;

    shipped: number;

    delivered: number;

    cancelled: number;

}

// ============================================
// Payment Status Analytics
// ============================================

export interface PaymentStatusAnalytics {

    pending: number;

    successful: number;

    failed: number;

}

// ============================================
// Inventory Analytics
// ============================================

export interface InventoryAnalytics {

    totalProducts: number;

    lowStockProducts: number;

    outOfStockProducts: number;

}

// ============================================
// Top Products
// ============================================

export interface TopProductAnalytics {

    productId: string;

    productName: string;

    unitsSold: number;

}

// ============================================
// Recent Orders
// ============================================

export interface RecentOrder {

    orderId: string;

    orderNumber: string;

    customerName: string;

    total: number;

    status: string;

    createdAt: string;

}

// ============================================
// Recent Payments
// ============================================

export interface RecentPayment {

    paymentId: string;

    razorpayPaymentId: string;

    orderNumber: string;

    amount: number;

    status: string;

    paidAt: string;

}

// ============================================
// Dashboard Response
// ============================================

export interface DashboardResponse {

    stats: DashboardStats;

    monthlyRevenue: MonthlyRevenue[];

    orderStatus: OrderStatusAnalytics;

    paymentStatus: PaymentStatusAnalytics;

    inventory: InventoryAnalytics;

    topProducts: TopProductAnalytics[];

    recentOrders: RecentOrder[];

    recentPayments: RecentPayment[];

}

// ============================================
// Dashboard API
// ============================================

export async function getDashboard(): Promise<DashboardResponse> {

    const response = await api.get<DashboardResponse>(
        "/admin/analytics"
    );

    return response.data;

}