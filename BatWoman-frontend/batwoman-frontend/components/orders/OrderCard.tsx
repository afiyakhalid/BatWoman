"use client";

import { useRouter } from "next/navigation";

import OrderStatusBadge from "./OrderStatusBadge";

import { Order } from "@/types/order";

interface Props {

    order: Order;

}

export default function OrderCard({

                                      order,

                                  }: Props) {

    const router = useRouter();

    return (

        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="font-semibold text-xl">

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

                    <p className="text-sm text-neutral-500">

                        Total

                    </p>

                    <p className="text-2xl font-semibold">

                        ₹{order.total}

                    </p>

                </div>

                <button

                    onClick={() =>

                        router.push(

                            `/customer/orders/${order.orderId}`

                        )

                    }

                    className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-neutral-800"

                >

                    View Details

                </button>

            </div>

        </div>

    );

}