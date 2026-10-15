"use client";

import { Activity, TrendingUp } from "lucide-react";

interface AnalyticsHeaderProps {
    totalRevenue: number;
    totalOrders: number;
}

export default function AnalyticsHeader({
                                            totalRevenue,
                                            totalOrders,
                                        }: AnalyticsHeaderProps) {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-[#E8DCC7] bg-gradient-to-br from-[#4A392D] via-[#3D3028] to-[#29211C] p-5 text-white shadow-[0_8px_30px_rgba(61,48,40,0.12)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C2A16A]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#D9C6A5]/10 blur-3xl" />

            <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-2xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D9C6A5]/30 bg-white/5 px-4 py-2">
                        <Activity
                            size={16}
                            className="text-[#D9C6A5]"
                        />
                        <span className="text-xs font-medium tracking-[0.14em] text-[#F0E5D2] sm:text-sm">
                            BUSINESS ANALYTICS
                        </span>
                    </div>

                    <h1 className="font-[var(--font-playfair)] text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        Measure. Analyze. Grow.
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#E0D5C7] sm:mt-5 sm:text-base">
                        Gain a complete view of your business with insights
                        into revenue, customer growth, payments, orders,
                        and inventory performance.
                    </p>
                </div>

                <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:min-w-[440px] xl:gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl sm:p-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D9C6A5] sm:text-xs">
                            Total Revenue
                        </p>

                        <h2 className="mt-3 break-words text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                            ₹{(totalRevenue ?? 0).toLocaleString("en-IN")}
                        </h2>

                        <div className="mt-4 flex items-center gap-2 text-[#D9C6A5]">
                            <TrendingUp size={17} />
                            <span className="text-xs">
                                Business Revenue
                            </span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl sm:p-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D9C6A5] sm:text-xs">
                            Orders Processed
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                            {(totalOrders ?? 0).toLocaleString("en-IN")}
                        </h2>

                        <div className="mt-4 flex items-center gap-2 text-[#D9C6A5]">
                            <Activity size={17} />
                            <span className="text-xs">
                                Across All Customers
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}