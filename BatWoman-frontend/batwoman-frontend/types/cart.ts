/**
 * A single item inside the customer's cart.
 *
 * The backend returns variant-level fields (variantId, sku, size, color)
 * so the UI can display what the customer actually selected.
 */
export interface CartItem {

    cartItemId: string;

    productId: string;

    /** The specific variant the customer added */
    variantId: string;

    productName: string;

    /** SKU of the selected variant */
    sku: string;

    /** Size of the selected variant (e.g. "M", "L", "XL") */
    size: string;

    /** Color display name of the selected variant (e.g. "Jet Black") */
    color: string;

    /** Primary product image URL — may be null if no media is uploaded yet */
    image: string | null;

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