import api from "@/lib/axios";
export interface CheckoutRequest {
    addressId: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export interface OrderResponse {
    orderId: string;
    orderNumber: string;
    status: string;
    subtotal: number;
    shippingCharge: number;
    total: number;
    createdAt: string;
    items: OrderItem[];
}

export async function checkout(
    request: CheckoutRequest
): Promise<OrderResponse> {

    const { data } = await api.post(
        "/orders/checkout",
        request
    );

    return data;
}

export async function getMyOrders(): Promise<OrderResponse[]> {

    const { data } = await api.get("/orders");

    return data;
}

export async function getOrder(
    orderId: string
): Promise<OrderResponse> {

    const { data } = await api.get(
        `/orders/${orderId}`
    );

    return data;
}

export async function cancelOrder(
    orderId: string
): Promise<void> {

    await api.delete(`/orders/${orderId}`);
}