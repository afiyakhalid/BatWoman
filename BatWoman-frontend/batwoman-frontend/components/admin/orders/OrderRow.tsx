
"use client";

import { Eye } from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";

import { Order } from "@/services/adminOrder.service";

interface OrderRowProps {
    order: Order;
    onView: (order: Order) => void;
}

export default function OrderRow({
                                     order,
                                     onView,
                                 }: OrderRowProps) {
    return (
        <tr className="border-b border-[#E7DED2] transition-colors hover:bg-[#F5F0E8]/70">
            <td className="whitespace-nowrap px-4 py-4 font-medium text-[#35291F] sm:px-6 sm:py-5">
                {order.orderNumber}
            </td>

            <td className="whitespace-nowrap px-4 py-4 text-sm text-[#766656] sm:px-6 sm:py-5">
                {new Date(order.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }
                )}
            </td>

            <td className="px-4 py-4 text-sm text-[#5D4A39] sm:px-6 sm:py-5">
                {order.items.length}
            </td>

            <td className="whitespace-nowrap px-4 py-4 font-semibold tabular-nums text-[#35291F] sm:px-6 sm:py-5">
                ₹
                {order.total.toLocaleString("en-IN")}
            </td>

            <td className="px-4 py-4 sm:px-6 sm:py-5">
                <OrderStatusBadge status={order.status} />
            </td>

            <td className="px-4 py-4 text-right sm:px-6 sm:py-5">
                <button
                    type="button"
                    onClick={() => onView(order)}
                    aria-label={`View order ${order.orderNumber}`}
                    title="View order"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4D9CA] bg-white text-[#766656] shadow-sm transition-colors hover:border-[#A68A64] hover:bg-[#F5F0E8] hover:text-[#35291F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A64]/40"
                >
                    <Eye size={18} strokeWidth={1.8} />
                </button>
            </td>
        </tr>
    );
}
