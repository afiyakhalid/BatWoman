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

    return (

        <div className="rounded-2xl border border-neutral-200 bg-white p-8">

            <h2 className="font-[var(--font-playfair)] text-3xl">

                Inventory Overview

            </h2>

            <p className="mt-2 text-neutral-500">

                Current inventory status across all products.

            </p>

            <div className="mt-8 space-y-5">

                <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-5">

                    <div className="flex items-center gap-4">

                        <Package className="text-blue-600" />

                        <div>

                            <p className="font-medium">

                                Total Products

                            </p>

                            <p className="text-sm text-neutral-500">

                                Products available

                            </p>

                        </div>

                    </div>

                    <span className="text-2xl font-bold">

                        {inventory.totalProducts}

                    </span>

                </div>

                <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-5">

                    <div className="flex items-center gap-4">

                        <AlertTriangle className="text-yellow-500" />

                        <div>

                            <p className="font-medium">

                                Low Stock

                            </p>

                            <p className="text-sm text-neutral-500">

                                Needs restocking

                            </p>

                        </div>

                    </div>

                    <span className="text-2xl font-bold">

                        {inventory.lowStockProducts}

                    </span>

                </div>

                <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-5">

                    <div className="flex items-center gap-4">

                        <PackageX className="text-red-500" />

                        <div>

                            <p className="font-medium">

                                Out of Stock

                            </p>

                            <p className="text-sm text-neutral-500">

                                Currently unavailable

                            </p>

                        </div>

                    </div>

                    <span className="text-2xl font-bold">

                        {inventory.outOfStockProducts}

                    </span>

                </div>

            </div>

        </div>

    );

}