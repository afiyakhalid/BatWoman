"use client";

import { Inventory } from "@/services/adminInventory.service";

import InventoryRow from "./InventoryRow";

interface InventoryTableProps {

    inventory: Inventory[];

    onRestock: (inventory: Inventory) => void;

}

export default function InventoryTable({

    inventory,

    onRestock,

}: InventoryTableProps) {

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

                                Actions

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

                            inventory.map((item) => (

                                <InventoryRow
                                    key={item.inventoryId}
                                    inventory={item}
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