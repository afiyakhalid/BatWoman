"use client";

import { useQuery } from "@tanstack/react-query";

import {
    getOrderTracking,
    getOrderTrackingEvents,
} from "@/services/shipping.service";

interface Props {
    orderId: string;
}

function formatDate(date: string) {
    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatStatus(status: string) {
    return status
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function OrderTrackingCard({
    orderId,
}: Props) {

    const {
        data: tracking,
        isLoading: trackingLoading,
        isError: trackingError,
    } = useQuery({
        queryKey: ["order-tracking", orderId],
        queryFn: () => getOrderTracking(orderId),
        enabled: Boolean(orderId),
    });

    const {
        data: events = [],
        isLoading: eventsLoading,
        isError: eventsError,
    } = useQuery({
        queryKey: ["order-tracking-events", orderId],
        queryFn: () => getOrderTrackingEvents(orderId),
        enabled: Boolean(orderId),
    });

    const isLoading =
        trackingLoading || eventsLoading;

    const isError =
        trackingError || eventsError;

    if (isLoading) {
        return (
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
                <h2 className="font-[var(--font-playfair)] text-3xl">
                    Shipment Tracking
                </h2>

                <p className="mt-6 text-neutral-500">
                    Loading tracking information...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
                <h2 className="font-[var(--font-playfair)] text-3xl">
                    Shipment Tracking
                </h2>

                <p className="mt-6 text-neutral-500">
                    Tracking information is currently unavailable.
                </p>
            </div>
        );
    }

    if (!tracking) {
        return null;
    }

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            {/* HEADER */}

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                <div>
                    <h2 className="font-[var(--font-playfair)] text-3xl">
                        Shipment Tracking
                    </h2>

                    <p className="mt-2 text-sm text-neutral-500">
                        Track your order delivery status
                    </p>
                </div>

                <span className="w-fit rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium">
                    {formatStatus(tracking.status)}
                </span>

            </div>

            {/* SHIPPING INFORMATION */}

            <div className="mt-8 grid gap-6 border-y border-neutral-200 py-6 md:grid-cols-3">

                <div>
                    <p className="text-sm text-neutral-500">
                        Courier
                    </p>

                    <p className="mt-1 font-medium">
                        {tracking.carrier || "Not assigned"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-neutral-500">
                        Tracking Number
                    </p>

                    <p className="mt-1 font-medium">
                        {tracking.trackingNumber || "Not assigned"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-neutral-500">
                        Expected Delivery
                    </p>

                    <p className="mt-1 font-medium">
                        {tracking.expectedDelivery
                            ? new Date(
                                  tracking.expectedDelivery
                              ).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                              })
                            : "Not available"}
                    </p>
                </div>

            </div>

            {/* TRACKING TIMELINE */}

            <div className="mt-8">

                <h3 className="text-lg font-semibold">
                    Tracking History
                </h3>

                {events.length === 0 ? (

                    <p className="mt-6 text-sm text-neutral-500">
                        No tracking events are available yet.
                    </p>

                ) : (

                    <div className="mt-8">

                        {events.map((event, index) => {

                            const isLast =
                                index === events.length - 1;

                            return (
                                <div
                                    key={`${event.eventTime}-${event.status}-${index}`}
                                    className="relative flex gap-5"
                                >

                                    {/* TIMELINE */}

                                    <div className="flex flex-col items-center">

                                        <div className="z-10 flex h-4 w-4 items-center justify-center rounded-full bg-black ring-4 ring-white" />

                                        {!isLast && (
                                            <div className="h-full w-px bg-neutral-300" />
                                        )}

                                    </div>

                                    {/* EVENT */}

                                    <div className="pb-10">

                                        <p className="font-semibold">
                                            {formatStatus(
                                                event.status
                                            )}
                                        </p>

                                        {event.description && (
                                            <p className="mt-1 text-sm text-neutral-600">
                                                {event.description}
                                            </p>
                                        )}

                                        {event.location && (
                                            <p className="mt-1 text-sm text-neutral-500">
                                                {event.location}
                                            </p>
                                        )}

                                        <p className="mt-2 text-xs text-neutral-400">
                                            {formatDate(
                                                event.eventTime
                                            )}
                                        </p>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                )}

            </div>

            {/* TRACKING LINK */}

            {tracking.trackingUrl && (
                <div className="mt-6 border-t border-neutral-200 pt-6">

                    <a
                        href={tracking.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                    >
                        Track Shipment
                    </a>

                </div>
            )}

        </div>
    );
}