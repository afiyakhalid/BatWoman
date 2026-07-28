import api from "@/lib/axios";
import { Order } from "@/types/order";

export interface CheckoutRequest {
    addressId: string;
}

export async function checkout(
    request: CheckoutRequest
): Promise<Order> {

    const { data } = await api.post<Order>(
        "/orders/checkout",
        request
    );

    return data;
}

export async function getMyOrders(): Promise<Order[]> {

    const { data } = await api.get<Order[]>(
        "/orders/my-orders"
    );

    return data;
}

export async function getOrder(
    orderId: string
): Promise<Order> {

    const { data } = await api.get<Order>(
        `/orders/${orderId}`
    );

    return data;
}

export async function cancelOrder(
    orderId: string
) {

    await api.delete(`/orders/${orderId}`);

}