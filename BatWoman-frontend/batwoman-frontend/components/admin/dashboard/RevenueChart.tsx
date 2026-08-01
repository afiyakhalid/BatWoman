"use client";

import {

    ResponsiveContainer,

    AreaChart,

    Area,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

} from "recharts";

import {

    MonthlyRevenue,

} from "@/services/adminDashboard.service";

interface RevenueChartProps {

    data: MonthlyRevenue[];

}

export default function RevenueChart({

    data,

}: RevenueChartProps) {

    return (

        <div className="rounded-2xl border border-neutral-200 bg-white p-8">

            <h2 className="font-[var(--font-playfair)] text-3xl">

                Revenue Overview

            </h2>

            <p className="mt-2 text-neutral-500">

                Monthly revenue generated from completed orders.

            </p>

            <div className="mt-10 h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={data}>

                        <defs>

                            <linearGradient

                                id="revenueGradient"

                                x1="0"

                                y1="0"

                                x2="0"

                                y2="1"

                            >

                                <stop

                                    offset="5%"

                                    stopColor="#000000"

                                    stopOpacity={0.35}

                                />

                                <stop

                                    offset="95%"

                                    stopColor="#000000"

                                    stopOpacity={0}

                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid

                            strokeDasharray="3 3"

                            vertical={false}

                        />

                        <XAxis

                            dataKey="month"

                        />

                        <YAxis />

                       <Tooltip
    formatter={(value) => [
        `₹${Number(value ?? 0).toLocaleString()}`,
        "Revenue",
    ]}
/>

                        <Area

                            type="monotone"

                            dataKey="revenue"

                            stroke="#000000"

                            strokeWidth={3}

                            fill="url(#revenueGradient)"

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}