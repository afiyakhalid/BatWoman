"use client";

import { RotateCw } from "lucide-react";

import InventoryStatusBadge from "./InventoryStatusBadge";

import { Inventory } from "@/services/adminInventory.service";

interface InventoryRowProps {

    inventory: Inventory;

    onRestock: (inventory: Inventory) => void;

}

export default function InventoryRow({

    inventory,

    onRestock,

}: InventoryRowProps) {

    return (

        <tr className="border-b border-neutral-200 transition hover:bg-neutral-50">

            <td className="px-6 py-5 font-medium">

                {inventory.productName}

            </td>

            <td className="px-6 py-5">

                {inventory.availableQuantity}

            </td>

            <td className="px-6 py-5">

                {inventory.reservedQuantity}

            </td>

            <td className="px-6 py-5">

                {inventory.totalQuantity}

            </td>

            <td className="px-6 py-5">

                <InventoryStatusBadge
                    availableQuantity={inventory.availableQuantity}
                />

            </td>

            <td className="px-6 py-5">

                {new Date(
                    inventory.updatedAt
                ).toLocaleDateString()}

            </td>

            <td className="px-6 py-5 text-right">

                <button
                    onClick={() => onRestock(inventory)}
                    className="rounded-lg p-2 transition hover:bg-neutral-100"
                >

                    <RotateCw size={18} />

                </button>

            </td>

        </tr>

    );

}