"use client";

import { useOrders } from "@/hooks/useOrders";

import EmptyOrders from "@/components/orders/EmptyOrders";
import OrderCard from "@/components/orders/OrderCard";

export default function OrdersPage() {

    const {

        data: orders,

        isLoading,

        isError,

    } = useOrders();

    if (isLoading) {

        return (

            <section className="mx-auto max-w-7xl px-6 py-36">

                Loading orders...

            </section>

        );

    }

    if (isError) {

        return (

            <section className="mx-auto max-w-7xl px-6 py-36">

                Failed to load orders.

            </section>

        );

    }

    if (!orders || orders.length === 0) {

        return <EmptyOrders />;

    }

    return (

        <section className="mx-auto max-w-7xl px-6 py-36">

            <div className="mb-12">

                <h1 className="font-[var(--font-playfair)] text-5xl">

                    My Orders

                </h1>

                <p className="mt-3 text-neutral-500">

                    View and track all your purchases.

                </p>

            </div>

            <div className="space-y-8">

                {orders.map((order) => (

                    <OrderCard

                        key={order.orderId}

                        order={order}

                    />

                ))}

            </div>

        </section>

    );

}