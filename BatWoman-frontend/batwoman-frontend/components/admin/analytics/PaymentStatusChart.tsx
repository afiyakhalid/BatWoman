"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import {
    PaymentStatusAnalytics,
} from "@/services/adminAnalytics.service";

interface PaymentStatusChartProps {
    data: PaymentStatusAnalytics;
}

const COLORS = [
    "#7D9274",
    "#C2A16A",
    "#A95148",
];

export default function PaymentStatusChart({
                                               data,
                                           }: PaymentStatusChartProps) {
    const chartData = [
        {
            name: "Successful",
            value: data?.successful ?? 0,
        },
        {
            name: "Pending",
            value: data?.pending ?? 0,
        },
        {
            name: "Failed",
            value: data?.failed ?? 0,
        },
    ];

    const totalPayments = chartData.reduce(
        (sum, item) => sum + item.value,
        0
    );

    return (
        <section className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-7">
            <h2 className="font-[var(--font-playfair)] text-2xl text-[#3D3028] sm:text-3xl">
                Payment Status
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#8A7A6C]">
                Success rate of all processed payments.
            </p>

            <div className="relative mt-6 h-[300px] min-w-0 sm:mt-8 sm:h-[350px]">
                {totalPayments === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-[#E5DCCE] bg-[#FAF7F2] text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                            <PieChart width={23} height={23} />
                        </div>

                        <p className="mt-3 text-sm font-medium text-[#59483A]">
                            No payment data available
                        </p>

                        <p className="mt-1 text-xs text-[#9A8B7B]">
                            Payment distribution will appear here.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-4">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A7A6C]">
                                Total Payments
                            </span>

                            <span className="mt-1 text-2xl font-semibold tabular-nums text-[#3D3028] sm:text-3xl">
                                {totalPayments.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius="56%"
                                    outerRadius="76%"
                                    paddingAngle={3}
                                    cornerRadius={4}
                                    stroke="#FFFDF9"
                                    strokeWidth={3}
                                >
                                    {chartData.map((item, index) => (
                                        <Cell
                                            key={item.name}
                                            fill={COLORS[index]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    formatter={(value) => [
                                        Number(value ?? 0).toLocaleString(
                                            "en-IN"
                                        ),
                                        "Payments",
                                    ]}
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "1px solid #EAE3D8",
                                        backgroundColor: "#FFFDF9",
                                        color: "#3D3028",
                                        boxShadow:
                                            "0 4px 16px rgba(61,48,40,0.08)",
                                    }}
                                />

                                <Legend
                                    verticalAlign="bottom"
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value) => (
                                        <span
                                            style={{
                                                color: "#75675C",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {value}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                )}
            </div>
        </section>
    );
}