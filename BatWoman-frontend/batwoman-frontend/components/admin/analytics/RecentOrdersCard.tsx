"use client";

import { ArrowUpRight } from "lucide-react";

import { RecentOrder } from "@/services/adminAnalytics.service";

interface RecentOrdersCardProps {

    orders: RecentOrder[];

}

export default function RecentOrdersCard({

    orders,

}: RecentOrdersCardProps) {

    return (

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-semibold">

                        Recent Orders

                    </h2>

                    <p className="mt-2 text-neutral-500">

                        Latest customer orders.

                    </p>

                </div>

                <ArrowUpRight className="text-neutral-400" />

            </div>

            <div className="space-y-5">

                {orders.map((order) => (

                    <div
                        key={order.orderId}
                        className="flex items-center justify-between rounded-2xl border border-neutral-100 p-4 transition hover:bg-neutral-50"
                    >

                        <div>

                            <h3 className="font-semibold">

                                {order.orderNumber}

                            </h3>

                            <p className="text-sm text-neutral-500">

                                {order.customerName}

                            </p>

                        </div>

                        <div className="text-right">

                            <p className="font-semibold">

                                ₹{order.total.toLocaleString()}

                            </p>

                            <span className="text-xs uppercase tracking-wide text-neutral-500">

                                {order.status}

                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}