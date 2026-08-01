"use client";

import {

    DollarSign,

    Package,

    ShoppingBag,

    Users,

} from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

import DashboardStatCard from "@/components/admin/dashboard/DashboardStatCard";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import RecentOrdersCard from "@/components/admin/dashboard/RecentOrdersCard";
import RecentPaymentsCard from "@/components/admin/dashboard/RecentPaymentsCard";
import InventoryOverview from "@/components/admin/dashboard/InventoryOverview";
import TopProductsCard from "@/components/admin/dashboard/TopProductsCard";

export default function AdminDashboard() {

    const {

        data,

        isLoading,

        isError,

    } = useDashboard();

    if (isLoading) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                Loading Dashboard...

            </div>

        );

    }

    if (isError || !data) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                Failed to load dashboard.

            </div>

        );

    }

    return (

        <div className="space-y-10">

            {/* KPI Cards */}

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <DashboardStatCard

                    title="Revenue"

                    value={`₹${data.stats.totalRevenue.toLocaleString()}`}

                    icon={<DollarSign className="text-white" size={22} />}

                />

                <DashboardStatCard

                    title="Orders"

                    value={data.stats.totalOrders}

                    icon={<ShoppingBag className="text-white" size={22} />}

                />

                <DashboardStatCard

                    title="Customers"

                    value={data.stats.totalCustomers}

                    icon={<Users className="text-white" size={22} />}

                />

                <DashboardStatCard

                    title="Products"

                    value={data.stats.totalProducts}

                    icon={<Package className="text-white" size={22} />}

                />

            </section>

            {/* Revenue + Orders */}

            <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">

                <RevenueChart

                    data={data.monthlyRevenue}

                />

                <RecentOrdersCard

                    orders={data.recentOrders}

                />

            </section>

            {/* Inventory + Payments */}

            <section className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">

                <InventoryOverview

                    inventory={data.inventory}

                />

                <RecentPaymentsCard

                    payments={data.recentPayments}

                />

            </section>

            {/* Top Products */}

            <section>

                <TopProductsCard

                    products={data.topProducts}

                />

            </section>

        </div>

    );

}