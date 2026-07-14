export interface CartItem {

    cartItemId: string;

    productId: string;

    productName: string;

    image: string;

    quantity: number;

    price: number;

    subtotal: number;

    categoryName: string;

}

export interface Cart {

    cartId: string;

    items: CartItem[];

    subtotal: number;

    shipping: number;

    total: number;

}