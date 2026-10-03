export type ShipmentStatus =
    | "PENDING"
    | "PROCESSING"
    | "PACKED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "RETURNED"
    | "CANCELLED";

export interface TrackingResponse {
    status: ShipmentStatus;
    carrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    expectedDelivery?: string;
    shippedAt?: string;
    deliveredAt?: string;
}

export interface TrackingEvent {
    status: ShipmentStatus;
    description?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    eventTime: string;
}