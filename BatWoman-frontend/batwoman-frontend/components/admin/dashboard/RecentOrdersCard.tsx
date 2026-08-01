"use client";

import { RecentOrder } from "@/services/adminDashboard.service";

interface RecentOrdersCardProps {

    orders: RecentOrder[];

}

export default function RecentOrdersCard({

    orders,

}: RecentOrdersCardProps) {

    return (

        <div className="rounded-2xl border border-neutral-200 bg-white p-8">

            <h2 className="font-[var(--font-playfair)] text-3xl">

                Recent Orders

            </h2>

            <p className="mt-2 text-neutral-500">

                Latest customer orders.

            </p>

            <div className="mt-8 space-y-5">

                {orders.length === 0 ? (

                    <p className="text-neutral-500">

                        No recent orders.

                    </p>

                ) : (

                    orders.map((order) => (

                        <div

                            key={order.orderId}

                            className="rounded-xl border border-neutral-200 p-5"

                        >

                            <div className="flex items-center justify-between">

                                <h3 className="font-semibold">

                                    {order.orderNumber}

                                </h3>

                                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">

                                    {order.status}

                                </span>

                            </div>

                            <p className="mt-3 text-sm text-neutral-500">

                                {order.customerName}

                            </p>

                            <div className="mt-4 flex items-center justify-between">

                                <p className="font-semibold">

                                    ₹{order.total.toLocaleString()}

                                </p>

                                <p className="text-sm text-neutral-500">

                                    {new Date(order.createdAt).toLocaleDateString()}

                                </p>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}