
"use client";

import {
    ShoppingBag,
    Clock3,
    Truck,
    CheckCircle2,
} from "lucide-react";

import { Order } from "@/services/adminOrder.service";

interface OrderSummaryCardsProps {
    orders: Order[];
}

export default function OrderSummaryCards({
                                              orders,
                                          }: OrderSummaryCardsProps) {
    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order) => order.status === "PENDING"
    ).length;

    const processingOrders = orders.filter(
        (order) => order.status === "PROCESSING"
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.status === "DELIVERED"
    ).length;

    const cards = [
        {
            title: "Total Orders",
            value: totalOrders,
            icon: ShoppingBag,
        },
        {
            title: "Pending",
            value: pendingOrders,
            icon: Clock3,
        },
        {
            title: "Processing",
            value: processingOrders,
            icon: Truck,
        },
        {
            title: "Delivered",
            value: deliveredOrders,
            icon: CheckCircle2,
        },
    ];

    return (
        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:mb-8 xl:grid-cols-4 xl:gap-5">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="rounded-2xl border border-[#E7DED2] bg-[#FBF8F3] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#857565] sm:text-sm sm:tracking-wide">
                                    {card.title}
                                </p>

                                <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-medium tabular-nums text-[#35291F] sm:text-4xl">
                                    {card.value.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#DCCDBA] bg-[#F1E9DE] text-[#8F7350] sm:h-14 sm:w-14">
                                <Icon
                                    size={23}
                                    strokeWidth={1.7}
                                />
                            </div>
                        </div>

                        <div className="mt-5 h-px w-full bg-[#E7DED2]" />

                        <p className="mt-3 text-xs text-[#948473]">
                            {card.title === "Total Orders"
                                ? "Orders in the current view"
                                : `${card.title} orders in the current view`}
                        </p>
                    </div>
                );
            })}
        </section>
    );
}
