"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import { PaymentStatusAnalytics } from "@/services/adminAnalytics.service";

interface PaymentStatusChartProps {

    data: PaymentStatusAnalytics;

}

const COLORS = [

    "#22c55e",

    "#f59e0b",

    "#ef4444",

];

export default function PaymentStatusChart({

    data,

}: PaymentStatusChartProps) {

    const chartData = [

        {

            name: "Successful",

            value: data.successful,

        },

        {

            name: "Pending",

            value: data.pending,

        },

        {

            name: "Failed",

            value: data.failed,

        },

    ];

    return (

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-semibold">

                Payment Status

            </h2>

            <p className="mt-2 text-neutral-500">

                Success rate of all processed payments.

            </p>

            <div className="mt-8 h-[350px]">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie

                            data={chartData}

                            dataKey="value"

                            outerRadius={120}

                            label

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