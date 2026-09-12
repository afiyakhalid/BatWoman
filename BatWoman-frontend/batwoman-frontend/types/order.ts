/**
 * A snapshot of a product variant at the time the order was placed.
 *
 * The backend stores these as order-item snapshots so historical
 * variant data is always available, even if the product is later modified.
 */
export interface OrderItem {

    productId: string;

    productName: string;

    /** The specific variant that was ordered */
    variantId: string;

    /** SKU of the variant at the time of ordering */
    variantSku: string;

    /** Size of the variant (e.g. "M") */
    size: string;

    /** Color display name (e.g. "Jet Black") */
    color: string;

    quantity: number;

    unitPrice: number;

    totalPrice: number;

}

export interface ShippingAddress {

    id: string;

    fullName: string;

    phone: string;

    addressLine1: string;

    addressLine2?: string;

    city: string;

    state: string;

    country: string;

    postalCode: string;

    defaultAddress: boolean;

}

export interface Order {

    orderId: string;

    orderNumber: string;

    status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

    paymentStatus?: string;

    subtotal: number;

    shippingCharge: number;

    discount?: number;

    total: number;

    createdAt: string;

    shippingAddress?: ShippingAddress;

    items: OrderItem[];

}