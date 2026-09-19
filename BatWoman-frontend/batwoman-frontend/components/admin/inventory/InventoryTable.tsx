"use client";

import {
    useState,
} from "react";

import {
    AdminInventoryProductResponse,
    Inventory,
} from "@/services/adminInventory.service";

import InventoryRow from "./InventoryRow";

interface InventoryTableProps {

    inventory: AdminInventoryProductResponse[];

    onRestock: (inventory: Inventory) => void;

}

export default function InventoryTable({

                                           inventory,

                                           onRestock,

                                       }: InventoryTableProps) {

    const [expandedProductIds, setExpandedProductIds] =
        useState<Set<string>>(
            new Set()
        );

    function toggleProduct(
        productId: string
    ) {

        setExpandedProductIds(
            (current) => {

                const next =
                    new Set(current);

                if (
                    next.has(
                        productId
                    )
                ) {

                    next.delete(
                        productId
                    );

                } else {

                    next.add(
                        productId
                    );

                }

                return next;

            }
        );

    }

    return (

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-neutral-50">

                    <tr>

                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            Product
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            Available
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            Reserved
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            Total
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            Updated
                        </th>

                        <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            Variants
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {inventory.length === 0 ? (

                        <tr>

                            <td
                                colSpan={7}
                                className="px-6 py-16 text-center text-neutral-500"
                            >

                                No inventory found.

                            </td>

                        </tr>

                    ) : (

                        inventory.map(
                            (item) => (

                                <InventoryRow
                                    key={
                                        item.productId
                                    }
                                    inventory={
                                        item
                                    }
                                    expanded={
                                        expandedProductIds.has(
                                            item.productId
                                        )
                                    }
                                    onToggle={() =>
                                        toggleProduct(
                                            item.productId
                                        )
                                    }
                                    onRestock={
                                        onRestock
                                    }
                                />

                            )
                        )

                    )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}