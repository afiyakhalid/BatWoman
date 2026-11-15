// import api from "@/lib/axios";
// import {
//     TrackingEvent,
//     TrackingResponse,
// } from "@/types/shipment";
//
// export async function getOrderTracking(
//     orderId: string
// ): Promise<TrackingResponse> {
//
//     const { data } = await api.get<TrackingResponse>(
//         `/shipping/orders/${orderId}/tracking`
//     );
//
//     return data;
// }
//
// export async function getOrderTrackingEvents(
//     orderId: string
// ): Promise<TrackingEvent[]> {
//
//     const { data } = await api.get<TrackingEvent[]>(
//         `/shipping/orders/${orderId}/tracking/events`
//     );
//
//     return data;
// }

import api from "@/lib/axios";
import {
    TrackingEvent,
    TrackingResponse,
} from "@/types/shipment";

export interface CourierOption {
    courierCompanyId: number;
    courierName: string;
    rate: number;
    estimatedDeliveryDays: string;
    estimatedDeliveryDate: string;
    rating: number;
}

export interface ShippingRateResponse {
    availableCouriers: CourierOption[];
}

export async function getShippingRates(
    addressId: string,
    cod: boolean = false
): Promise<ShippingRateResponse> {
    const { data } = await api.get<ShippingRateResponse>(
        "/shipping/rates",
        {
            params: {
                addressId,
                cod,
            },
        }
    );

    return data;
}

export async function getOrderTracking(
    orderId: string
): Promise<TrackingResponse> {
    const { data } = await api.get<TrackingResponse>(
        `/shipping/orders/${orderId}/tracking`
    );

    return data;
}

export async function getOrderTrackingEvents(
    orderId: string
): Promise<TrackingEvent[]> {
    const { data } = await api.get<TrackingEvent[]>(
        `/shipping/orders/${orderId}/tracking/events`
    );

    return data;
}
