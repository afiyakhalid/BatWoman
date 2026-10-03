import api from "@/lib/axios";
import {
    TrackingEvent,
    TrackingResponse,
} from "@/types/shipment";

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