"use client";

import { useState } from "react";

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
        useState<Set<string>>(new Set());

    function toggleProduct(productId: string) {
        setExpandedProductIds((current) => {
            const next = new Set(current);

            if (next.has(productId)) {
                next.delete(productId);
            } else {
                next.add(productId);
            }

            return next;
        });
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] shadow-[0_2px_10px_rgba(61,48,40,0.03)]">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead className="bg-[#F7F2EA]">
                    <tr>
                        {[
                            "Product",
                            "Available",
                            "Reserved",
                            "Total",
                            "Status",
                            "Updated",
                        ].map((heading) => (
                            <th
                                key={heading}
                                className="whitespace-nowrap border-b border-[#EAE3D8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#897968] sm:px-6"
                            >
                                {heading}
                            </th>
                        ))}

                        <th className="whitespace-nowrap border-b border-[#EAE3D8] px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-[#897968] sm:px-6">
                            Variants
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {inventory.length === 0 ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="px-6 py-16 text-center"
                            >
                                <p className="text-sm font-medium text-[#59483A]">
                                    No inventory found
                                </p>
                                <p className="mt-1 text-xs text-[#9A8B7B]">
                                    Inventory items will appear here when
                                    available.
                                </p>
                            </td>
                        </tr>
                    ) : (
                        inventory.map((item) => (
                            <InventoryRow
                                key={item.productId}
                                inventory={item}
                                expanded={expandedProductIds.has(
                                    item.productId
                                )}
                                onToggle={() =>
                                    toggleProduct(item.productId)
                                }
                                onRestock={onRestock}
                            />
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}