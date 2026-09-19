"use client";

import {
    ChevronDown,
    ChevronUp,
    RotateCw,
} from "lucide-react";

import InventoryStatusBadge from "./InventoryStatusBadge";

import {
    AdminInventoryProductResponse,
    Inventory,
} from "@/services/adminInventory.service";

interface InventoryRowProps {

    inventory: AdminInventoryProductResponse;

    onRestock: (inventory: Inventory) => void;

    expanded: boolean;

    onToggle: () => void;

}

export default function InventoryRow({

                                         inventory,

                                         onRestock,

                                         expanded,

                                         onToggle,

                                     }: InventoryRowProps) {

    return (
        <>
            <tr
                className="cursor-pointer border-b border-neutral-200 transition hover:bg-neutral-50"
                onClick={onToggle}
            >

                <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                onToggle();
                            }}
                            className="rounded-lg p-1 transition hover:bg-neutral-200"
                            aria-label={
                                expanded
                                    ? "Collapse variants"
                                    : "Expand variants"
                            }
                        >

                            {expanded ? (
                                <ChevronUp size={18} />
                            ) : (
                                <ChevronDown size={18} />
                            )}

                        </button>

                        <span className="font-medium">
                            {
                                inventory.productName
                            }
                        </span>

                    </div>

                </td>

                <td className="px-6 py-5">

                    {
                        inventory.availableQuantity
                    }

                </td>

                <td className="px-6 py-5">

                    {
                        inventory.reservedQuantity
                    }

                </td>

                <td className="px-6 py-5">

                    {
                        inventory.totalQuantity
                    }

                </td>

                <td className="px-6 py-5">

                    <InventoryStatusBadge
                        availableQuantity={
                            inventory.availableQuantity
                        }
                    />

                </td>

                <td className="px-6 py-5">

                    {
                        new Date(
                            inventory.updatedAt
                        ).toLocaleDateString()
                    }

                </td>

                <td className="px-6 py-5 text-right">

                    <span className="text-sm text-neutral-400">

                        {inventory.variantCount}{" "}
                        {inventory.variantCount === 1
                            ? "variant"
                            : "variants"}

                    </span>

                </td>

            </tr>

            {expanded && (

                <tr className="border-b border-neutral-200 bg-neutral-50">

                    <td
                        colSpan={7}
                        className="px-6 py-5"
                    >

                        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">

                            <table className="min-w-full">

                                <thead className="bg-neutral-100">

                                <tr>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                        SKU
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                        Size
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                        Color
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                        Available
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                        Reserved
                                    </th>

                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                        Total
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                        Action
                                    </th>

                                </tr>

                                </thead>

                                <tbody>

                                {inventory.variants.map(
                                    (variant) => {

                                        const variantInventory: Inventory = {

                                            inventoryId:
                                            variant.inventoryId,

                                            variantId:
                                            variant.variantId,

                                            productId:
                                            inventory.productId,

                                            productName:
                                            inventory.productName,

                                            sku:
                                            variant.sku,

                                            size:
                                            variant.size,

                                            color:
                                            variant.color,

                                            availableQuantity:
                                            variant.availableQuantity,

                                            reservedQuantity:
                                            variant.reservedQuantity,

                                            totalQuantity:
                                            variant.totalQuantity,

                                            updatedAt:
                                            variant.updatedAt,

                                        };

                                        return (

                                            <tr
                                                key={
                                                    variant.inventoryId
                                                }
                                                className="border-t border-neutral-100"
                                            >

                                                <td className="px-5 py-4 font-medium">
                                                    {
                                                        variant.sku
                                                    }
                                                </td>

                                                <td className="px-5 py-4">
                                                    {
                                                        variant.size
                                                    }
                                                </td>

                                                <td className="px-5 py-4">
                                                    {
                                                        variant.color
                                                    }
                                                </td>

                                                <td className="px-5 py-4">
                                                    {
                                                        variant.availableQuantity
                                                    }
                                                </td>

                                                <td className="px-5 py-4">
                                                    {
                                                        variant.reservedQuantity
                                                    }
                                                </td>

                                                <td className="px-5 py-4">
                                                    {
                                                        variant.totalQuantity
                                                    }
                                                </td>

                                                <td className="px-5 py-4 text-right">

                                                    <button
                                                        type="button"
                                                        onClick={(
                                                            event
                                                        ) => {

                                                            event.stopPropagation();

                                                            onRestock(
                                                                variantInventory
                                                            );

                                                        }}
                                                        className="rounded-lg p-2 transition hover:bg-neutral-100"
                                                        title="Adjust inventory"
                                                    >

                                                        <RotateCw
                                                            size={18}
                                                        />

                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                                </tbody>

                            </table>

                        </div>

                    </td>

                </tr>

            )}

        </>
    );

}