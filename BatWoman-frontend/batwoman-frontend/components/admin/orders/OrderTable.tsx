
"use client";

import { Order } from "@/services/adminOrder.service";

import OrderRow from "./OrderRow";

interface OrderTableProps {
    orders: Order[];
    onView: (order: Order) => void;
}

export default function OrderTable({
                                       orders,
                                       onView,
                                   }: OrderTableProps) {
    return (
        <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-[#E4D9CA] bg-[#FBF8F3] shadow-sm">
            <div className="flex flex-col gap-1 border-b border-[#E7DED2] px-4 py-4 sm:px-6">
                <h2 className="font-[var(--font-playfair)] text-xl font-medium text-[#35291F]">
                    Orders
                </h2>

                <p className="text-sm text-[#857565]">
                    {orders.length}{" "}
                    {orders.length === 1 ? "order" : "orders"}
                </p>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead className="bg-[#F1E9DE]">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656] sm:px-6">
                            Order #
                        </th>

                        <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656] sm:px-6">
                            Date
                        </th>

                        <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656] sm:px-6">
                            Items
                        </th>

                        <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656] sm:px-6">
                            Total
                        </th>

                        <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656] sm:px-6">
                            Status
                        </th>

                        <th className="whitespace-nowrap px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#766656] sm:px-6">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-6 py-16 text-center"
                            >
                                <div className="mx-auto flex max-w-sm flex-col items-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E4D9CA] bg-[#F1E9DE] text-[#A68A64]">
                                            <span className="font-[var(--font-playfair)] text-xl">
                                                —
                                            </span>
                                    </div>

                                    <p className="mt-4 font-[var(--font-playfair)] text-lg text-[#35291F]">
                                        No orders found
                                    </p>

                                    <p className="mt-1 text-sm text-[#948473]">
                                        Orders matching your current filters will appear here.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <OrderRow
                                key={order.orderId}
                                order={order}
                                onView={onView}
                            />
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-[#E7DED2] bg-[#F5F0E8]/60 px-4 py-3 sm:px-6">
                <p className="text-xs text-[#948473]">
                    Showing {orders.length}{" "}
                    {orders.length === 1 ? "order" : "orders"}
                </p>
            </div>
        </div>
    );
}
