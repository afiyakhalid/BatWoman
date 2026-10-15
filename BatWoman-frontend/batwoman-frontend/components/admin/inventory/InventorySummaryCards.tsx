"use client";

import {
    Archive,
    AlertTriangle,
    Package,
    Boxes,
} from "lucide-react";

import {
    AdminInventorySummaryResponse,
} from "@/services/adminInventory.service";

interface InventorySummaryCardsProps {
    summary: AdminInventorySummaryResponse;
}

export default function InventorySummaryCards({
                                                  summary,
                                              }: InventorySummaryCardsProps) {
    const cards = [
        {
            title: "Products",
            value: summary.totalProducts,
            icon: Package,
        },
        {
            title: "Available Units",
            value: summary.availableUnits,
            icon: Boxes,
        },
        {
            title: "Reserved Units",
            value: summary.reservedUnits,
            icon: AlertTriangle,
        },
        {
            title: "Out Of Stock",
            value: summary.outOfStockProducts,
            icon: Archive,
        },
    ];

    return (
        <section
            aria-label="Inventory statistics"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="group rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] transition-all duration-200 hover:border-[#D9C6A5] hover:shadow-[0_6px_20px_rgba(61,48,40,0.06)] sm:p-6"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#8A7A6C]">
                                    {card.title}
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#3D3028] tabular-nums sm:text-4xl">
                                    {card.value.toLocaleString("en-IN")}
                                </h2>
                            </div>

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] transition-colors duration-200 group-hover:bg-[#EFE3D0] sm:h-14 sm:w-14">
                                <Icon
                                    size={23}
                                    strokeWidth={1.6}
                                    className="text-[#94764C]"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        <div className="mt-5 h-px w-full bg-[#EEE7DD]" />
                    </div>
                );
            })}
        </section>
    );
}