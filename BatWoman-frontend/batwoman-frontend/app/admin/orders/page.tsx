"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminOrders } from "@/hooks/useAdminOrders";

import OrderSummaryCards from "@/components/admin/orders/OrderSummaryCards";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderToolbar from "@/components/admin/orders/OrderToolbar";

export default function OrdersPage() {

    const router = useRouter();

    const { data: orders = [], isLoading } = useAdminOrders();

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("ALL");

    const filteredOrders = useMemo(() => {

        return orders.filter((order) => {

            const matchesSearch =
                order.orderNumber
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                status === "ALL"
                    ? true
                    : order.status === status;

            return matchesSearch && matchesStatus;

        });

    }, [orders, search, status]);

    if (isLoading) {

        return (

            <div className="p-8">

                Loading orders...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <OrderToolbar

                search={search}

                onSearchChange={setSearch}

                status={status}

                onStatusChange={setStatus}

            />

            <OrderSummaryCards

                orders={orders}

            />

            <OrderTable

                orders={filteredOrders}

                onView={(order) =>
                    router.push(
                        `/admin/orders/${order.orderId}`
                    )
                }

            />

        </div>

    );

}