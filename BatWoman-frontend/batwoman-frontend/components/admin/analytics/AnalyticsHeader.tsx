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

        <section className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-10 text-white shadow-xl">

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">

                        <Activity size={16} />

                        <span className="text-sm font-medium">

                            Business Analytics

                        </span>

                    </div>

                    <h1 className="max-w-3xl text-5xl font-bold tracking-tight">

                        Measure. Analyze. Grow.

                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300">

                        Gain a complete view of your business with
                        live insights into revenue, customer growth,
                        payments, orders, and inventory performance.

                    </p>

                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

                        <p className="text-sm uppercase tracking-widest text-neutral-300">

                            Total Revenue

                        </p>

                        <h2 className="mt-3 text-4xl font-bold">

                            ₹{totalRevenue.toLocaleString()}

                        </h2>

                        <div className="mt-5 flex items-center gap-2 text-emerald-400">

                            <TrendingUp size={18} />

                            <span className="text-sm">

                                Live Business Revenue

                            </span>

                        </div>

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

                        <p className="text-sm uppercase tracking-widest text-neutral-300">

                            Orders Processed

                        </p>

                        <h2 className="mt-3 text-4xl font-bold">

                            {totalOrders}

                        </h2>

                        <div className="mt-5 flex items-center gap-2 text-sky-400">

                            <Activity size={18} />

                            <span className="text-sm">

                                Across All Customers

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}