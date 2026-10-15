"use client";

import {
    TrendingUp,
    DollarSign,
} from "lucide-react";

interface RevenueGrowthCardProps {
    revenue?: number;
    orders?: number;
}

export default function RevenueGrowthCard({
                                              revenue = 0,
                                              orders = 0,
                                          }: RevenueGrowthCardProps) {
    const safeRevenue = Number(revenue ?? 0);
    const safeOrders = Number(orders ?? 0);

    return (
        <section className="relative overflow-hidden rounded-2xl border border-[#5C4937] bg-gradient-to-br from-[#4A392D] via-[#3D3028] to-[#29211C] p-5 text-white shadow-[0_8px_30px_rgba(61,48,40,0.12)] sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#C2A16A]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-[#D9C6A5]/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
                <div>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D9C6A5] sm:text-xs">
                        Business Performance
                    </p>

                    <h2 className="font-[var(--font-playfair)] text-3xl leading-tight sm:text-4xl">
                        Revenue Insights
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-[#E0D5C7]">
                        An overview of your business revenue and order
                        activity.
                    </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-[#D9C6A5] sm:h-14 sm:w-14">
                    <TrendingUp size={25} strokeWidth={1.6} />
                </div>
            </div>

            <div className="relative mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9C6A5]/20 bg-[#D9C6A5]/10 text-[#D9C6A5]">
                        <DollarSign size={21} strokeWidth={1.7} />
                    </div>

                    <p className="text-xs font-medium uppercase tracking-[0.13em] text-[#D9C6A5]">
                        Total Revenue
                    </p>

                    <h3 className="mt-3 break-words text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                        ₹{safeRevenue.toLocaleString("en-IN")}
                    </h3>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9C6A5]/20 bg-[#D9C6A5]/10 text-[#D9C6A5]">
                        <TrendingUp size={21} strokeWidth={1.7} />
                    </div>

                    <p className="text-xs font-medium uppercase tracking-[0.13em] text-[#D9C6A5]">
                        Total Orders
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                        {safeOrders.toLocaleString("en-IN")}
                    </h3>
                </div>
            </div>
        </section>
    );
}