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

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-neutral-500">

                                    {card.title}

                                </p>

                                <h2 className="mt-3 text-4xl font-semibold">

                                    {card.value}

                                </h2>

                            </div>

                            <div className="rounded-xl bg-black p-4">

                                <Icon
                                    size={22}
                                    className="text-white"
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </section>

    );

}