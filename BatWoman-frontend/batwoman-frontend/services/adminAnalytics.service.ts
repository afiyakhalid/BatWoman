import api from "@/lib/axios";

export interface DashboardStats {

    totalRevenue: number;

    totalOrders: number;

    totalCustomers: number;

    totalProducts: number;

    lowStockProducts: number;

    outOfStockProducts: number;

}

export interface MonthlyRevenue {

    month: string;

    revenue: number;

}

export interface RecentOrder {

    orderId: string;

    orderNumber: string;

    customerName: string;

    total: number;

    status: string;

    createdAt: string;

}

export interface RecentPayment {

    paymentId: string;

    razorpayPaymentId: string;

    orderNumber: string;

    amount: number;

    status: string;

    paidAt: string;

}

export interface Analytics {

    stats: DashboardStats;

    monthlyRevenue: MonthlyRevenue[];

    orderStatus: OrderStatusAnalytics;

    paymentStatus: PaymentStatusAnalytics;

    inventory: InventoryAnalytics;

    topProducts: TopProductAnalytics[];

    recentOrders: RecentOrder[];

    recentPayments: RecentPayment[];

}
export interface OrderStatusAnalytics {

    pending: number;

    paid: number;

    shipped: number;

    delivered: number;

    cancelled: number;

}

export interface PaymentStatusAnalytics {

    pending: number;

    successful: number;

    failed: number;

}

export interface InventoryAnalytics {

    healthy: number;

    lowStock: number;

    outOfStock: number;

}

export interface TopProductAnalytics {

    productId: string;

    productName: string;

    unitsSold: number;

}

export async function getAnalytics(): Promise<Analytics> {

    const { data } = await api.get(
        "/admin/analytics"
    );

    return data;

}