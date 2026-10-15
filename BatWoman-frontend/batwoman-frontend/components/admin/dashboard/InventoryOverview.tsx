"use client";

import {
    AlertTriangle,
    Package,
    PackageX,
} from "lucide-react";

import {
    InventoryAnalytics,
} from "@/services/adminDashboard.service";

interface InventoryOverviewProps {
    inventory: InventoryAnalytics;
}

export default function InventoryOverview({
                                              inventory,
                                          }: InventoryOverviewProps) {
    const cards = [
        {
            title: "Total Products",
            description: "Products available",
            value: inventory.totalProducts,
            icon: Package,
            iconStyle: "border-[#E8DCC7] bg-[#F5EFE5] text-[#94764C]",
        },
        {
            title: "Low Stock",
            description: "Needs restocking",
            value: inventory.lowStockProducts,
            icon: AlertTriangle,
            iconStyle: "border-[#E8D9B8] bg-[#F8F0DE] text-[#96743D]",
        },
        {
            title: "Out of Stock",
            description: "Currently unavailable",
            value: inventory.outOfStockProducts,
            icon: PackageX,
            iconStyle: "border-[#E8C9C5] bg-[#F9EDEA] text-[#9B5148]",
        },
    ];

    return (
        <section className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-7">
            <div>
                <h2 className="font-[var(--font-playfair)] text-2xl text-[#3D3028] sm:text-3xl">
                    Inventory Overview
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#8A7A6C]">
                    Current inventory status across all products.
                </p>
            </div>

            <div className="mt-7 space-y-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="flex items-center justify-between gap-4 rounded-xl border border-[#EAE3D8] bg-white p-4 transition-colors duration-200 hover:border-[#D9C6A5] hover:bg-[#FAF7F2] sm:p-5"
                        >
                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${card.iconStyle}`}
                                >
                                    <Icon
                                        size={21}
                                        strokeWidth={1.6}
                                    />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-[#3D3028] sm:text-base">
                                        {card.title}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-[#8A7A6C] sm:text-sm">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            <span className="shrink-0 text-2xl font-semibold tabular-nums text-[#3D3028] sm:text-3xl">
                                {(card.value ?? 0).toLocaleString("en-IN")}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}