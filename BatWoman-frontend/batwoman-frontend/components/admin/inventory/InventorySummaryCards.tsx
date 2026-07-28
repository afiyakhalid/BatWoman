"use client";

import {

    Archive,

    AlertTriangle,

    Package,

    Boxes,

} from "lucide-react";

import { Inventory } from "@/services/adminInventory.service";

interface InventorySummaryCardsProps {

    inventory: Inventory[];

}

export default function InventorySummaryCards({

    inventory,

}: InventorySummaryCardsProps) {

    const totalProducts = inventory.length;

    const lowStock = inventory.filter(

        (item) =>

            item.availableQuantity > 0 &&
            item.availableQuantity <= 10

    ).length;

    const outOfStock = inventory.filter(

        (item) => item.availableQuantity === 0

    ).length;

    const totalUnits = inventory.reduce(

        (sum, item) => sum + item.totalQuantity,

        0

    );

    const cards = [

        {

            title: "Products",

            value: totalProducts,

            icon: Package,

        },

        {

            title: "Total Units",

            value: totalUnits,

            icon: Boxes,

        },

        {

            title: "Low Stock",

            value: lowStock,

            icon: AlertTriangle,

        },

        {

            title: "Out Of Stock",

            value: outOfStock,

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