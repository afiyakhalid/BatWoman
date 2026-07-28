"use client";

import { useParams } from "next/navigation";

import { useOrder } from "@/hooks/useOrders";

import OrderItemsCard from "@/components/orders/OrderItemsCard";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";
import ShippingAddressCard from "@/components/orders/ShippingAddressCard";
import OrderTimeline from "@/components/orders/OrderTimeline";

export default function OrderDetailsPage() {

    const params = useParams();

    const orderId = params.orderId as string;

    const {

        data: order,

        isLoading,

        isError,

    } = useOrder(orderId);

    if (isLoading) {

        return (

            <section className="mx-auto max-w-7xl px-6 py-36">

                Loading order...

            </section>

        );

    }

    if (isError || !order) {

        return (

            <section className="mx-auto max-w-7xl px-6 py-36">

                Failed to load order.

            </section>

        );

    }

    return (

        <section className="mx-auto max-w-7xl px-6 py-36">

            <div className="mb-12">

                <h1 className="font-[var(--font-playfair)] text-5xl">

                    {order.orderNumber}

                </h1>

                <p className="mt-3 text-neutral-500">

                    Review your order details.

                </p>

            </div>

            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

                <div className="space-y-8">

                    <OrderTimeline

                        status={order.status}

                        createdAt={order.createdAt}

                    />

                    <ShippingAddressCard

                        address={order.shippingAddress}

                    />

                    <OrderItemsCard

                        items={order.items}

                    />

                </div>

                <div>

                    <OrderSummaryCard

                        subtotal={order.subtotal}

                        shipping={order.shippingCharge}

                        discount={order.discount}

                        total={order.total}

                    />

                </div>

            </div>

        </section>

    );

}