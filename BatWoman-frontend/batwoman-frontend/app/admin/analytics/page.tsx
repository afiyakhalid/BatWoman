"use client";

import {
  Activity,
  Box,
  ShoppingBag,
  Users,
  DollarSign,
  RefreshCw,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import { useAnalytics } from "@/hooks/useAnalytics";

import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import AnalyticsStatCard from "@/components/admin/analytics/AnalyticsStatCard";
import RevenueGrowthCard from "@/components/admin/analytics/RevenueGrowthCard";
import RevenueChart from "@/components/admin/analytics/RevenueChart";
import InventoryOverview from "@/components/admin/analytics/InventoryOverview";
import RecentOrdersCard from "@/components/admin/analytics/RecentOrdersCard";
import RecentPaymentsCard from "@/components/admin/analytics/RecentPaymentsCard";

export default function AnalyticsPage() {
  const { data, isLoading, isError, refetch } = useAnalytics();

  // Premium Skeleton Loading State
  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  // Premium Error State
  if (isError || !data) {
    return (
      <div className="flex h-[75vh] w-full items-center justify-center p-6">
        <div className="relative flex max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border border-rose-200/60 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl dark:border-rose-900/30 dark:bg-zinc-900/80">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 ring-1 ring-rose-200 dark:bg-rose-950/50 dark:ring-rose-900/50">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Unable to Load Analytics
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            We couldn't retrieve the dashboard metrics. Please check your database connection or try refreshing.
          </p>
          <button
            onClick={() => refetch?.()}
            className="mt-6 flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { stats } = data;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <div className="relative min-h-screen space-y-8 bg-slate-50/50 p-6 dark:bg-zinc-950/40 md:p-10">
      {/* Ambient background blur elements */}
      <div className="pointer-events-none absolute left-10 top-10 -z-10 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/2 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

      {/* Real-time Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4 dark:border-zinc-800/80">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Live Analytics Syncing
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-zinc-400">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Real-time Dashboard Overview</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="transition-all duration-300">
        <AnalyticsHeader
          totalRevenue={stats?.totalRevenue ?? 0}
          totalOrders={stats?.totalOrders ?? 0}
        />
      </div>

      {/* Revenue Growth Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
        <RevenueGrowthCard
          revenue={stats?.totalRevenue ?? 0}
          orders={stats?.totalOrders ?? 0}
        />
      </div>

      {/* KPI Cards */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="group transition-all duration-300 hover:-translate-y-1">
          <AnalyticsStatCard
            title="Revenue"
            value={formatCurrency(stats?.totalRevenue ?? 0)}
            subtitle="Total Revenue"
            icon={
              <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-600 ring-1 ring-indigo-500/20 dark:text-indigo-400">
                <DollarSign className="h-6 w-6" />
              </div>
            }
          />
        </div>

        <div className="group transition-all duration-300 hover:-translate-y-1">
          <AnalyticsStatCard
            title="Customers"
            value={(stats?.totalCustomers ?? 0).toLocaleString()}
            subtitle="Registered Users"
            icon={
              <div className="rounded-xl bg-sky-500/10 p-2.5 text-sky-600 ring-1 ring-sky-500/20 dark:text-sky-400">
                <Users className="h-6 w-6" />
              </div>
            }
          />
        </div>

        <div className="group transition-all duration-300 hover:-translate-y-1">
          <AnalyticsStatCard
            title="Products"
            value={(stats?.totalProducts ?? 0).toLocaleString()}
            subtitle="Products Listed"
            icon={
              <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
                <Box className="h-6 w-6" />
              </div>
            }
          />
        </div>

        <div className="group transition-all duration-300 hover:-translate-y-1">
          <AnalyticsStatCard
            title="Orders"
            value={(stats?.totalOrders ?? 0).toLocaleString()}
            subtitle="Orders Processed"
            icon={
              <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                <ShoppingBag className="h-6 w-6" />
              </div>
            }
          />
        </div>
      </section>

      {/* Revenue Chart Section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300 dark:border-zinc-800/80 dark:bg-zinc-900/80">
        <RevenueChart data={data.monthlyRevenue} />
      </section>

      {/* Inventory Overview Section */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
        <InventoryOverview inventory={data.inventory} />
      </section>

      {/* Recent Activity Section */}
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
          <RecentOrdersCard orders={data.recentOrders} />
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/80">
          <RecentPaymentsCard payments={data.recentPayments} />
        </div>
      </section>
    </div>
  );
}

/**
 * Skeleton Loader Component
 */
function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 bg-slate-50/50 p-6 dark:bg-zinc-950/40 md:p-10">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-60 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
          <div className="h-4 w-80 animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-800" />
        </div>
        <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
      </div>

      {/* Highlight Skeleton */}
      <div className="h-28 w-full animate-pulse rounded-2xl bg-slate-200/80 dark:bg-zinc-800/80" />

      {/* KPI Skeleton Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex h-32 animate-pulse flex-col justify-between rounded-2xl bg-slate-200/80 p-5 dark:bg-zinc-800/80"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 rounded bg-slate-300 dark:bg-zinc-700" />
              <div className="h-10 w-10 rounded-xl bg-slate-300 dark:bg-zinc-700" />
            </div>
            <div className="h-7 w-28 rounded bg-slate-300 dark:bg-zinc-700" />
            <div className="h-3 w-16 rounded bg-slate-300 dark:bg-zinc-700" />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="h-80 w-full animate-pulse rounded-2xl bg-slate-200/80 dark:bg-zinc-800/80" />

      {/* Double Column Skeleton */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-72 w-full animate-pulse rounded-2xl bg-slate-200/80 dark:bg-zinc-800/80" />
        <div className="h-72 w-full animate-pulse rounded-2xl bg-slate-200/80 dark:bg-zinc-800/80" />
      </div>
    </div>
  );
}