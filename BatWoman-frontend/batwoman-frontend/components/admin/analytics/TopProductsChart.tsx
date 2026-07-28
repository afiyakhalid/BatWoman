"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import { TopProductAnalytics } from "@/services/adminAnalytics.service";

interface TopProductsChartProps {

    products: TopProductAnalytics[];

}

export default function TopProductsChart({

    products,

}: TopProductsChartProps) {

    return (

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-semibold">

                Top Selling Products

            </h2>

            <p className="mt-2 text-neutral-500">

                Best performing products based on units sold.

            </p>

            <div className="mt-8 h-[380px]">

                <ResponsiveContainer>

                    <BarChart
                        data={products}
                        layout="vertical"
                        margin={{
                            top: 10,
                            right: 20,
                            left: 40,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="4 4"
                            horizontal={false}
                        />

                        <XAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            type="category"
                            dataKey="productName"
                            tickLine={false}
                            axisLine={false}
                            width={140}
                        />

                        <Tooltip />

                        <Bar

                            dataKey="unitsSold"

                            radius={[0, 10, 10, 0]}

                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}