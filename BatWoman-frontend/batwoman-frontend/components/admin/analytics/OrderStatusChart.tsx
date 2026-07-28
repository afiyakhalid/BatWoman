"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

import { OrderStatusAnalytics } from "@/services/adminAnalytics.service";

interface OrderStatusChartProps {

    data: OrderStatusAnalytics;

}

const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
    "#ef4444",
];

export default function OrderStatusChart({

    data,

}: OrderStatusChartProps) {

    const chartData = [

        {
            name: "Pending",
            value: data.pending,
        },

        {
            name: "Paid",
            value: data.paid,
        },

        {
            name: "Shipped",
            value: data.shipped,
        },

        {
            name: "Delivered",
            value: data.delivered,
        },

        {
            name: "Cancelled",
            value: data.cancelled,
        },

    ];

    return (

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-semibold">

                Order Status

            </h2>

            <p className="mt-2 text-neutral-500">

                Distribution of all customer orders.

            </p>

            <div className="mt-8 h-[350px]">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie

                            data={chartData}

                            innerRadius={85}

                            outerRadius={120}

                            paddingAngle={4}

                            dataKey="value"

                        >

                            {chartData.map((_, index) => (

                                <Cell

                                    key={index}

                                    fill={COLORS[index]}

                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}