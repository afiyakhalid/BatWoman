"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Order } from "@/types/order";

import OrderStatusBadge from "./OrderStatusBadge";

interface Props {

    order: Order;

}

export default function OrderCard({

                                      order,

                                  }: Props) {

    return (

        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-semibold">

                        {order.orderNumber}

                    </h2>

                    <p className="mt-2 text-neutral-500">

                        {

                            new Date(

                                order.createdAt

                            ).toLocaleDateString()

                        }

                    </p>

                </div>

                <OrderStatusBadge

                    status={order.status}

                />

            </div>

            <div className="mt-8 flex items-center justify-between">

                <div>

                    <p className="text-neutral-500">

                        {order.items.length} Items

                    </p>

                    <h3 className="mt-2 text-2xl font-semibold">

                        ₹{order.total}

                    </h3>

                </div>

                <Link

                    href={`/customer/orders/${order.orderId}`}

                    className="flex items-center gap-2 font-medium"

                >

                    View Details

                    <ArrowRight size={18} />

                </Link>

            </div>

        </div>

    );

}