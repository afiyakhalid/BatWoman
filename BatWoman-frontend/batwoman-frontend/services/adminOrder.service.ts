import api from "@/lib/axios";

export interface OrderItem {

    productId: string;

    productName: string;

    quantity: number;

    unitPrice: number;

    totalPrice: number;

}

export interface Order {

    orderId: string;

    orderNumber: string;

    status: string;

    subtotal: number;

    shippingCharge: number;

    total: number;

    createdAt: string;

    items: OrderItem[];

}

export interface UpdateOrderStatusRequest {

    status: string;

}

export async function getOrders(): Promise<Order[]> {

    const { data } = await api.get(
        "/admin/orders"
    );

    return data;

}

export async function getOrder(
    orderId: string
): Promise<Order> {

    const { data } = await api.get(
        `/admin/orders/${orderId}`
    );

    return data;

}

export async function updateOrderStatus(
    orderId: string,
    request: UpdateOrderStatusRequest
): Promise<void> {

    await api.put(
        `/admin/orders/${orderId}/status`,
        request
    );

}