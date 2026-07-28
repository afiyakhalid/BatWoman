"use client";

import { useParams } from "next/navigation";
import { useOrder } from "@/hooks/useOrder";
import OrderStatusBadge from "@/components/admin/orders/OrderStatusBadge";

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: order, isLoading } = useOrder(id);

    console.log("Route ID:", id);

    if (isLoading) {
        return <div className="p-8">Loading order...</div>;
    }

    if (!order) {
        return <div className="p-8">Order not found.</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-[var(--font-playfair)] text-5xl">
                    {order.orderNumber}
                </h1>
                <p className="mt-3 text-neutral-500">
                    Created on{" "}
                    {new Date(order.createdAt).toLocaleString()}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border p-6">
                    <h2 className="mb-4 font-semibold">Status</h2>
                    <OrderStatusBadge status={order.status} />
                </div>

                <div className="rounded-2xl border p-6">
                    <h2 className="mb-4 font-semibold">Total</h2>
                    <p className="text-3xl font-bold">
                        ₹{order.total.toLocaleString()}
                    </p>
                </div>

                <div className="rounded-2xl border p-6">
                    <h2 className="mb-4 font-semibold">Items</h2>
                    <p className="text-3xl font-bold">
                        {order.items.length}
                    </p>
                </div>
            </div>

            <div className="rounded-2xl border bg-white">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="px-6 py-4 text-left">
                                Product
                            </th>
                            <th className="px-6 py-4 text-left">
                                Quantity
                            </th>
                            <th className="px-6 py-4 text-left">
                                Unit Price
                            </th>
                            <th className="px-6 py-4 text-left">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item) => (
                            <tr
                                key={item.productId}
                                className="border-b"
                            >
                                <td className="px-6 py-4">
                                    {item.productName}
                                </td>
                                <td className="px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    ₹{item.unitPrice.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 font-semibold">
                                    ₹{item.totalPrice.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}