"use client";

import {
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    Sparkles,
    AlertCircle,
    TrendingUp,
    BarChart3,
    Boxes,
    Award,
    type LucideIcon,
} from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

import DashboardStatCard from "@/components/admin/dashboard/DashboardStatCard";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import RecentOrdersCard from "@/components/admin/dashboard/RecentOrdersCard";
import RecentPaymentsCard from "@/components/admin/dashboard/RecentPaymentsCard";
import InventoryOverview from "@/components/admin/dashboard/InventoryOverview";
import TopProductsCard from "@/components/admin/dashboard/TopProductsCard";

function SectionEyebrow({
                            icon: Icon,
                            label,
                        }: {
    icon: LucideIcon;
    label: string;
}) {
    return (
        <div className="flex min-w-0 items-center gap-2.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#E6D8C5] bg-[#F1E7D9]">
        <Icon className="text-[#8D6B43]" size={12} strokeWidth={2} />
      </span>

            <h2 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8B8174] sm:text-xs sm:tracking-[0.15em]">
                {label}
            </h2>

            <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-[#E5D8C6] to-transparent" />
        </div>
    );
}

export default function AdminDashboard() {
    const { data, isLoading, isError } = useDashboard();

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
                <div className="relative flex h-14 w-14 items-center justify-center">
                    <div className="absolute h-full w-full animate-spin rounded-full border-2 border-[#E8DDD0] border-t-[#98764D]" />

                    <Sparkles className="h-5 w-5 text-[#A18A6E]" />
                </div>

                <div className="text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B8174] sm:text-xs">
                        Loading analytics
                    </p>

                    <p className="mt-2 text-xs text-[#A09484] sm:text-sm">
                        Gathering the latest store activity
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
                <div className="rounded-2xl border border-[#EAD1CC] bg-[#F8EBE8] p-4">
                    <AlertCircle size={26} className="text-[#A34E3E]" />
                </div>

                <h2 className="font-[var(--font-playfair)] text-xl font-semibold text-[#30271F] sm:text-2xl">
                    Failed to load dashboard
                </h2>

                <p className="max-w-sm text-sm leading-relaxed text-[#8B8174]">
                    We couldn't retrieve the latest analytics data. Check your
                    network connection and try again.
                </p>
            </div>
        );
    }

    return (
        <div className="min-w-0 space-y-8 pb-8 sm:space-y-10 sm:pb-12">
            {/* Executive Header */}
            <section className="relative isolate overflow-hidden rounded-2xl border border-[#E7DDD0] bg-gradient-to-br from-[#FFFDFA] via-[#FFFDFA] to-[#F4EBDD] px-4 py-6 shadow-[0_2px_10px_rgba(70,50,30,0.04)] sm:rounded-3xl sm:px-8 sm:py-8 lg:px-10">
                <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-48 w-48 rounded-full bg-[#E8D6BA]/40 blur-3xl sm:h-64 sm:w-64" />

                <div className="pointer-events-none absolute -bottom-12 -left-10 -z-10 h-40 w-40 rounded-full bg-[#EDE4D8]/70 blur-3xl" />

                <div className="relative flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9B866B] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A18A6E]" />
              Store management
            </span>

                        <h1 className="mt-3 break-words font-[var(--font-playfair)] text-3xl font-medium leading-tight tracking-tight text-[#30271F] sm:text-4xl lg:text-5xl">
                            Executive Overview
                        </h1>

                        <p className="mt-3 max-w-lg text-xs leading-relaxed text-[#817568] sm:text-sm">
                            Your store performance, revenue insights, and latest
                            customer activity in one place.
                        </p>
                    </div>

                    <div className="flex shrink-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E5D2] bg-[#EDF4E9] px-3 py-2 text-[10px] font-semibold text-[#56734D] sm:px-3.5 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#83A779] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#718F65]" />
              </span>

                            Live Analytics
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Performance Indicators */}
            <section className="min-w-0 space-y-4 sm:space-y-5">
                <SectionEyebrow
                    icon={TrendingUp}
                    label="Key Performance Indicators"
                />

                <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-5">
                    <DashboardStatCard
                        title="Revenue"
                        value={`₹${Number(data.stats.totalRevenue).toLocaleString("en-IN")}`}
                        icon={<DollarSign size={21} />}
                    />

                    <DashboardStatCard
                        title="Orders"
                        value={data.stats.totalOrders}
                        icon={<ShoppingBag size={21} />}
                    />

                    <DashboardStatCard
                        title="Customers"
                        value={data.stats.totalCustomers}
                        icon={<Users size={21} />}
                    />

                    <DashboardStatCard
                        title="Products"
                        value={data.stats.totalProducts}
                        icon={<Package size={21} />}
                    />
                </div>
            </section>

            {/* Revenue and Orders */}
            <section className="min-w-0 space-y-4 sm:space-y-5">
                <SectionEyebrow
                    icon={BarChart3}
                    label="Revenue & Orders"
                />

                <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:gap-6">
                    <div className="min-w-0">
                        <RevenueChart data={data.monthlyRevenue} />
                    </div>

                    <div className="min-w-0">
                        <RecentOrdersCard orders={data.recentOrders} />
                    </div>
                </div>
            </section>

            {/* Inventory and Payments */}
            <section className="min-w-0 space-y-4 sm:space-y-5">
                <SectionEyebrow
                    icon={Boxes}
                    label="Inventory & Payments"
                />

                <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] xl:gap-6">
                    <div className="min-w-0">
                        <InventoryOverview inventory={data.inventory} />
                    </div>

                    <div className="min-w-0">
                        <RecentPaymentsCard payments={data.recentPayments} />
                    </div>
                </div>
            </section>

            {/* Top Products */}
            <section className="min-w-0 space-y-4 sm:space-y-5">
                <SectionEyebrow
                    icon={Award}
                    label="Top Products"
                />

                <div className="min-w-0">
                    <TopProductsCard products={data.topProducts} />
                </div>
            </section>
        </div>
    );
}