"use client";

import { InventoryAnalytics } from "@/services/adminAnalytics.service";

interface InventoryOverviewProps {
    inventory: InventoryAnalytics;
}

export default function InventoryOverview({
    inventory,
}: InventoryOverviewProps) {
    const total =
        (inventory?.healthy ?? 0) +
        (inventory?.lowStock ?? 0) +
        (inventory?.outOfStock ?? 0);

    const healthyPercentage =
        total === 0 ? 0 : ((inventory?.healthy ?? 0) / total) * 100;

    const lowPercentage =
        total === 0 ? 0 : ((inventory?.lowStock ?? 0) / total) * 100;

    const outPercentage =
        total === 0 ? 0 : ((inventory?.outOfStock ?? 0) / total) * 100;

    return (
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold dark:text-white">
                Inventory Overview
            </h2>

            <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                Current stock health across all products.
            </p>

            <div className="mt-10 space-y-8">
                <div>
                    <div className="mb-2 flex justify-between font-medium dark:text-zinc-200">
                        <span>Healthy Stock</span>
                        <span>{inventory?.healthy ?? 0}</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-neutral-200 dark:bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                            style={{
                                width: `${healthyPercentage}%`,
                            }}
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex justify-between font-medium dark:text-zinc-200">
                        <span>Low Stock</span>
                        <span>{inventory?.lowStock ?? 0}</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-neutral-200 dark:bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-amber-400 transition-all duration-700"
                            style={{
                                width: `${lowPercentage}%`,
                            }}
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex justify-between font-medium dark:text-zinc-200">
                        <span>Out of Stock</span>
                        <span>{inventory?.outOfStock ?? 0}</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-neutral-200 dark:bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-red-500 transition-all duration-700"
                            style={{
                                width: `${outPercentage}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}