import api from "@/lib/axios";

import { Cart } from "@/types/cart";

export async function getCart() {

    const { data } = await api.get<Cart>("/cart");

    return data;

}

export async function addToCart(

    productId: string,

    quantity: number

) {

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

) {

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

) {

    await api.delete(

        `/cart/items/${cartItemId}`

    );

}

export async function clearCart() {

    await api.delete("/cart");

}