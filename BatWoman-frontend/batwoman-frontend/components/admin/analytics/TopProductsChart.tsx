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

import {
    TopProductAnalytics,
} from "@/services/adminAnalytics.service";

interface TopProductsChartProps {
    products: TopProductAnalytics[];
}

export default function TopProductsChart({
                                             products,
                                         }: TopProductsChartProps) {
    const chartData = (products ?? []).map((product) => ({
        ...product,
        unitsSold: product.unitsSold ?? 0,
    }));

    return (
        <section className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-7">
            <div>
                <h2 className="font-[var(--font-playfair)] text-2xl text-[#3D3028] sm:text-3xl">
                    Top Selling Products
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#8A7A6C]">
                    Best performing products based on units sold.
                </p>
            </div>

            <div className="mt-6 h-[320px] min-w-0 sm:mt-8 sm:h-[380px]">
                {chartData.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-[#E5DCCE] bg-[#FAF7F2] text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]">
                            <span className="text-xl">—</span>
                        </div>

                        <p className="mt-3 text-sm font-medium text-[#59483A]">
                            No product data available
                        </p>

                        <p className="mt-1 text-xs text-[#9A8B7B]">
                            Product sales performance will appear here.
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{
                                top: 8,
                                right: 12,
                                left: 4,
                                bottom: 4,
                            }}
                        >
                            <CartesianGrid
                                stroke="#EEE7DD"
                                strokeDasharray="4 5"
                                horizontal={false}
                            />

                            <XAxis
                                type="number"
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                                tick={{
                                    fill: "#8A7A6C",
                                    fontSize: 11,
                                }}
                                tickMargin={10}
                            />

                            <YAxis
                                type="category"
                                dataKey="productName"
                                tickLine={false}
                                axisLine={false}
                                width={100}
                                tick={{
                                    fill: "#75675C",
                                    fontSize: 11,
                                }}
                                tickFormatter={(value: string) =>
                                    value.length > 18
                                        ? `${value.slice(0, 18)}…`
                                        : value
                                }
                            />

                            <Tooltip
                                formatter={(value) => [
                                    Number(value ?? 0).toLocaleString("en-IN"),
                                    "Units Sold",
                                ]}
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #EAE3D8",
                                    backgroundColor: "#FFFDF9",
                                    color: "#3D3028",
                                    boxShadow:
                                        "0 4px 16px rgba(61,48,40,0.08)",
                                }}
                                labelStyle={{
                                    color: "#8A7A6C",
                                    marginBottom: "4px",
                                }}
                                cursor={{
                                    fill: "#F5EFE5",
                                }}
                            />

                            <Bar
                                dataKey="unitsSold"
                                name="Units Sold"
                                fill="#94764C"
                                radius={[0, 6, 6, 0]}
                                maxBarSize={28}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </section>
    );
}