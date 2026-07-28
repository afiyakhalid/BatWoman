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

        <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition">

            <td className="px-6 py-5 font-medium">

                {order.orderNumber}

            </td>

            <td className="px-6 py-5">

                {new Date(order.createdAt).toLocaleDateString()}

            </td>

            <td className="px-6 py-5">

                {order.items.length}

            </td>

            <td className="px-6 py-5 font-semibold">

                ₹{order.total.toLocaleString()}

            </td>

            <td className="px-6 py-5">

                <OrderStatusBadge
                    status={order.status}
                />

            </td>

            <td className="px-6 py-5 text-right">

                <button
                    onClick={() => onView(order)}
                    className="rounded-lg p-2 transition hover:bg-neutral-100"
                >

                    <Eye size={18} />

                </button>

            </td>

        </tr>

    );

}