"use client";

import { useQuery } from "@tanstack/react-query";
import { Truck, ExternalLink, Calendar, Hash } from "lucide-react";

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

    const isLoading = trackingLoading || eventsLoading;
    const isError = trackingError || eventsError;

    if (isLoading) {
        return (
            <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium mb-1">
                    Logistics & Transit
                </p>
                <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-neutral-900 font-normal">
                    Shipment Tracking
                </h2>
                <div className="mt-8 flex items-center gap-3 text-neutral-500">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
                    <p className="text-xs uppercase tracking-[0.18em]">
                        Retrieving courier telemetry...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium mb-1">
                    Logistics & Transit
                </p>
                <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-neutral-900 font-normal">
                    Shipment Tracking
                </h2>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-neutral-500">
                    Tracking dispatch data is currently being calibrated by the courier.
                </p>
            </div>
        );
    }

    if (!tracking) {
        return null;
    }

    return (
        <div className="bg-white border border-[#e7e1d8] p-6 sm:p-8 shadow-[0_4px_25px_rgba(45,31,26,0.03)] rounded-none">
            {/* HEADER */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-neutral-900 font-normal">
                        Shipment Tracking
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500">
                        Track your order delivery status
                    </p>
                </div>

                <span className="w-fit border border-[#e8dfd3] bg-[#f4eee6] px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8C6D4F]">
                    {formatStatus(tracking.status)}
                </span>
            </div>

            {/* SHIPPING INFORMATION GRID */}
            <div className="mt-8 grid gap-4 border border-[#eee8e0] bg-[#faf8f5] p-5 sm:grid-cols-3">
                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                        Courier
                    </p>
                    <p className="font-[var(--font-playfair)] text-base text-neutral-900">
                        {tracking.carrier || "Not assigned"}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                        Tracking Number
                    </p>
                    <p className="font-mono text-xs font-medium text-neutral-900">
                        {tracking.trackingNumber || "Not assigned"}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                        Expected Delivery
                    </p>
                    <p className="font-[var(--font-playfair)] text-base text-neutral-900">
                        {tracking.expectedDelivery
                            ? new Date(tracking.expectedDelivery).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                              })
                            : "Not available"}
                    </p>
                </div>
            </div>

            {/* TRACKING TIMELINE */}
            <div className="mt-8 pt-6 border-t border-[#f0eae1]">
                <h3 className="text-xs uppercase tracking-[0.22em] text-neutral-900 font-semibold mb-6">
                    Tracking History
                </h3>

                {events.length === 0 ? (
                    <p className="text-xs text-neutral-500">
                        No tracking events are available yet.
                    </p>
                ) : (
                    <div className="relative pl-2">
                        {events.map((event, index) => {
                            const isLast = index === events.length - 1;

                            return (
                                <div
                                    key={`${event.eventTime}-${event.status}-${index}`}
                                    className="relative flex gap-5"
                                >
                                    {/* TIMELINE INDICATOR */}
                                    <div className="flex flex-col items-center">
                                        <div className="z-10 flex h-3 w-3 items-center justify-center rounded-full bg-black ring-4 ring-[#faf8f5]" />
                                        {!isLast && (
                                            <div className="h-full w-px bg-[#e7e1d8]" />
                                        )}
                                    </div>

                                    {/* EVENT DETAILS */}
                                    <div className="pb-8">
                                        <p className="text-xs uppercase tracking-[0.16em] font-semibold text-neutral-900">
                                            {formatStatus(event.status)}
                                        </p>

                                        {event.description && (
                                            <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                                                {event.description}
                                            </p>
                                        )}

                                        {event.location && (
                                            <p className="mt-0.5 text-[11px] text-[#8C6D4F] tracking-wide">
                                                {event.location}
                                            </p>
                                        )}

                                        <p className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                                            {formatDate(event.eventTime)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* EXTERNAL TRACKING LINK */}
            {tracking.trackingUrl && (
                <div className="mt-4 pt-6 border-t border-[#f0eae1]">
                    <a
                        href={tracking.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-black px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-white transition hover:bg-neutral-800 rounded-none shadow-sm"
                    >
                        <span>Track Consignment</span>
                        <ExternalLink size={13} />
                    </a>
                </div>
            )}
        </div>
    );
}