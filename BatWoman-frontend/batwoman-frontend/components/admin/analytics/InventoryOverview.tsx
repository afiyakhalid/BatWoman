"use client";

import { InventoryAnalytics } from "@/services/adminAnalytics.service";

interface InventoryOverviewProps {
    inventory: InventoryAnalytics;
}

export default function InventoryOverview({
                                              inventory,
                                          }: InventoryOverviewProps) {
    const healthy = inventory?.healthy ?? 0;
    const lowStock = inventory?.lowStock ?? 0;
    const outOfStock = inventory?.outOfStock ?? 0;

    const total = healthy + lowStock + outOfStock;

    const healthyPercentage =
        total === 0 ? 0 : (healthy / total) * 100;

    const lowPercentage =
        total === 0 ? 0 : (lowStock / total) * 100;

    const outPercentage =
        total === 0 ? 0 : (outOfStock / total) * 100;

    const stockGroups = [
        {
            title: "Healthy Stock",
            description: "Inventory at healthy levels",
            value: healthy,
            percentage: healthyPercentage,
            barStyle: "bg-[#94764C]",
            markerStyle: "bg-[#94764C]",
        },
        {
            title: "Low Stock",
            description: "Products that may need restocking",
            value: lowStock,
            percentage: lowPercentage,
            barStyle: "bg-[#C2A16A]",
            markerStyle: "bg-[#C2A16A]",
        },
        {
            title: "Out of Stock",
            description: "Products currently unavailable",
            value: outOfStock,
            percentage: outPercentage,
            barStyle: "bg-[#A95148]",
            markerStyle: "bg-[#A95148]",
        },
    ];

    return (
        <section className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="font-[var(--font-playfair)] text-2xl text-[#3D3028] sm:text-3xl">
                        Inventory Overview
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#8A7A6C]">
                        Current stock health across all products.
                    </p>
                </div>

                <div className="shrink-0 rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] px-3 py-2 text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A7A6C]">
                        Total
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-[#3D3028]">
                        {total.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            <div className="mt-8 space-y-7">
                {stockGroups.map((group) => (
                    <div key={group.title}>
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                                <span
                                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${group.markerStyle}`}
                                />

                                <div>
                                    <p className="text-sm font-semibold text-[#3D3028]">
                                        {group.title}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-[#9A8B7B]">
                                        {group.description}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 text-right">
                                <p className="text-lg font-semibold tabular-nums text-[#3D3028]">
                                    {group.value.toLocaleString("en-IN")}
                                </p>
                                <p className="mt-0.5 text-xs tabular-nums text-[#8A7A6C]">
                                    {group.percentage.toFixed(1)}%
                                </p>
                            </div>
                        </div>

                        <div
                            className="h-2.5 overflow-hidden rounded-full bg-[#F0E9DF]"
                            role="progressbar"
                            aria-label={group.title}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Number(
                                group.percentage.toFixed(1)
                            )}
                        >
                            <div
                                className={`h-full rounded-full transition-all duration-700 ${group.barStyle}`}
                                style={{
                                    width: `${group.percentage}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}