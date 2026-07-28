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
        <div className="rounded-3xl bg-gradient-to-br from-black via-neutral-900 to-neutral-800 p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">
                        Revenue Insights
                    </h2>
                    <p className="mt-2 text-neutral-300">
                        Key business performance indicators.
                    </p>
                </div>

                <TrendingUp
                    size={48}
                    className="text-emerald-400"
                />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
                    <DollarSign
                        className="mb-4 text-emerald-400"
                        size={28}
                    />

                    <p className="text-sm text-neutral-300">
                        Total Revenue
                    </p>

                    <h3 className="mt-3 text-3xl font-bold">
                        ₹{safeRevenue.toLocaleString()}
                    </h3>
                </div>

                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg">
                    <TrendingUp
                        className="mb-4 text-yellow-400"
                        size={28}
                    />

                    <p className="text-sm text-neutral-300">
                        Total Orders
                    </p>

                    <h3 className="mt-3 text-3xl font-bold">
                        {safeOrders.toLocaleString()}
                    </h3>
                </div>
            </div>
        </div>
    );
}