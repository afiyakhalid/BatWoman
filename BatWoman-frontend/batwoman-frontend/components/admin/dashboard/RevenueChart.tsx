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

import type { MonthlyRevenue } from "@/services/adminDashboard.service";

interface RevenueChartProps {
    data: MonthlyRevenue[];
}

export default function RevenueChart({
                                         data,
                                     }: RevenueChartProps) {
    return (
        <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E7DDD0] bg-[#FFFDFA] p-4 shadow-[0_2px_8px_rgba(70,50,30,0.04)] sm:p-6 lg:p-7">
            {/* Chart heading */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18A6E]">
                        Store performance
                    </p>

                    <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-[#30271F] sm:text-3xl">
                        Revenue Overview
                    </h2>

                    <p className="mt-2 max-w-md text-xs leading-relaxed text-[#8B8174] sm:text-sm">
                        Monthly revenue generated from completed orders.
                    </p>
                </div>

                <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#E8DACA] bg-[#F5EDE2] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#8D6B43] sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A8875B]" />
          Revenue
        </span>
            </div>

            {/* Responsive chart */}
            <div className="mt-6 h-[250px] min-w-0 sm:mt-8 sm:h-[300px] lg:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 8,
                            left: -18,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="zubaidaRevenueGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#B69A73"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#B69A73"
                                    stopOpacity={0.02}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            stroke="#EDE5DA"
                            strokeDasharray="3 5"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#92816D",
                                fontSize: 11,
                            }}
                            tickMargin={12}
                            minTickGap={16}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={52}
                            tick={{
                                fill: "#92816D",
                                fontSize: 10,
                            }}
                            tickFormatter={(value) =>
                                Number(value) >= 1000
                                    ? `₹${(Number(value) / 1000).toLocaleString("en-IN", {
                                        maximumFractionDigits: 1,
                                    })}k`
                                    : `₹${Number(value).toLocaleString("en-IN")}`
                            }
                        />

                        <Tooltip
                            formatter={(value) => [
                                `₹${Number(value ?? 0).toLocaleString("en-IN")}`,
                                "Revenue",
                            ]}
                            contentStyle={{
                                backgroundColor: "#FFFDFA",
                                border: "1px solid #E7DDD0",
                                borderRadius: "12px",
                                padding: "10px 14px",
                                boxShadow: "0 6px 20px rgba(70, 50, 30, 0.08)",
                            }}
                            labelStyle={{
                                color: "#8D6B43",
                                fontSize: 12,
                                marginBottom: 4,
                            }}
                            itemStyle={{
                                color: "#30271F",
                                fontSize: 13,
                            }}
                            cursor={{
                                stroke: "#B69A73",
                                strokeDasharray: "4 4",
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            stroke="#9A7B51"
                            strokeWidth={2.5}
                            fill="url(#zubaidaRevenueGradient)"
                            activeDot={{
                                r: 5,
                                fill: "#9A7B51",
                                stroke: "#FFFDFA",
                                strokeWidth: 2,
                            }}
                            connectNulls
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {data.length === 0 && (
                <p className="mt-2 text-center text-xs text-[#92816D]">
                    No revenue data is available yet.
                </p>
            )}
        </section>
    );
}