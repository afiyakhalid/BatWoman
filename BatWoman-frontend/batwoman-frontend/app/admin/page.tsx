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

// Small reusable label used above each dashboard section — keeps the
// section rhythm consistent without needing a separate component file.
function SectionEyebrow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-900">
        <Icon className="text-white" size={11} strokeWidth={2.5} />
      </span>
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
        {label}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-neutral-200 to-transparent" />
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading, isError } = useDashboard();

  // Premium Loading State
  if (isLoading) {
    return (
      <div className="flex h-[75vh] flex-col items-center justify-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute h-full w-full animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
          <Sparkles className="h-4 w-4 text-neutral-400" />
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-400 uppercase">
            Loading Analytics
          </p>
          <p className="mt-1 text-[11px] text-neutral-300">
            Gathering the latest store activity
          </p>
        </div>
      </div>
    );
  }

  // Premium Error State
  if (isError || !data) {
    return (
      <div className="flex h-[75vh] flex-col items-center justify-center gap-3 text-center">
        <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-4 shadow-sm">
          <AlertCircle size={26} className="text-red-500" />
        </div>
        <h2 className="font-[var(--font-playfair)] text-lg font-semibold text-neutral-900">
          Failed to load dashboard
        </h2>
        <p className="text-sm text-neutral-500 max-w-sm">
          We couldn't retrieve the latest analytics data. Please check your network connection or try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Executive Header */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-gradient-to-br from-white via-white to-neutral-50 px-6 py-7 shadow-sm sm:px-8">
        {/* ambient glow accent, purely decorative */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-amber-100/50 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-gradient-to-tr from-neutral-100/70 to-transparent blur-2xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              <span className="h-1 w-1 rounded-full bg-neutral-400" />
              Dashboard
            </span>
            <h1 className="mt-2 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text font-[var(--font-playfair)] text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Executive Overview
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
              Real-time store performance, revenue insights, and activity logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm shadow-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Live Analytics
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="space-y-4">
        <SectionEyebrow icon={TrendingUp} label="Key Performance Indicators" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            title="Revenue"
            value={`₹${Number(data.stats.totalRevenue).toLocaleString()}`}
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
        </div>
      </section>

      {/* Revenue + Orders */}
      <section className="space-y-4">
        <SectionEyebrow icon={BarChart3} label="Revenue & Orders" />
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <RevenueChart data={data.monthlyRevenue} />
          <RecentOrdersCard orders={data.recentOrders} />
        </div>
      </section>

      {/* Inventory + Payments */}
      <section className="space-y-4">
        <SectionEyebrow icon={Boxes} label="Inventory & Payments" />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <InventoryOverview inventory={data.inventory} />
          <RecentPaymentsCard payments={data.recentPayments} />
        </div>
      </section>

      {/* Top Products */}
      <section className="space-y-4">
        <SectionEyebrow icon={Award} label="Top Products" />
        <TopProductsCard products={data.topProducts} />
      </section>
    </div>
  );
}