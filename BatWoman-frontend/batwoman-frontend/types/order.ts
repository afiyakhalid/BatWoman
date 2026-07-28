export interface OrderItem {

    productId: string;

    productName: string;

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