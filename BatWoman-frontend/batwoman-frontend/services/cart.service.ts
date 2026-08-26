import api from "@/lib/axios";

import { Cart } from "@/types/cart";

export async function getCart(): Promise<Cart> {
    const { data } = await api.get<Cart>("/cart");

    return data;
}

export async function addToCart(
    productId: string,
    quantity: number
): Promise<Cart> {

    const { data } = await api.post<Cart>(
        "/cart",
        {
            productId,
            quantity,
        }
    );

    return data;
}

export async function updateCartItem(
    cartItemId: string,
    quantity: number
): Promise<Cart> {

    const { data } = await api.put<Cart>(
        `/cart/items/${cartItemId}`,
        {
            quantity,
        }
    );

    return data;
}

export async function removeCartItem(
    cartItemId: string
): Promise<void> {

    await api.delete(
        `/cart/items/${cartItemId}`
    );
}

export async function clearCart(): Promise<void> {

    await api.delete("/cart");
}