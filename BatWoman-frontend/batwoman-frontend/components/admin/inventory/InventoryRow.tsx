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
                className="cursor-pointer border-b border-[#EAE3D8] transition-colors duration-200 hover:bg-[#FAF7F2]"
                onClick={onToggle}
            >
                <td className="whitespace-nowrap px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                onToggle();
                            }}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E5D8C4] bg-white text-[#94764C] transition-colors hover:bg-[#F5EFE5] hover:text-[#59452F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65]"
                            aria-label={
                                expanded
                                    ? "Collapse variants"
                                    : "Expand variants"
                            }
                        >
                            {expanded ? (
                                <ChevronUp size={17} />
                            ) : (
                                <ChevronDown size={17} />
                            )}
                        </button>

                        <span className="font-medium text-[#3D3028]">
                            {inventory.productName}
                        </span>
                    </div>
                </td>

                <td className="px-5 py-5 text-sm font-medium tabular-nums text-[#3D3028] sm:px-6">
                    {inventory.availableQuantity}
                </td>

                <td className="px-5 py-5 text-sm tabular-nums text-[#75675C] sm:px-6">
                    {inventory.reservedQuantity}
                </td>

                <td className="px-5 py-5 text-sm font-medium tabular-nums text-[#3D3028] sm:px-6">
                    {inventory.totalQuantity}
                </td>

                <td className="whitespace-nowrap px-5 py-5 sm:px-6">
                    <InventoryStatusBadge
                        availableQuantity={inventory.availableQuantity}
                    />
                </td>

                <td className="whitespace-nowrap px-5 py-5 text-sm text-[#75675C] sm:px-6">
                    {new Date(inventory.updatedAt).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }
                    )}
                </td>

                <td className="whitespace-nowrap px-5 py-5 text-right sm:px-6">
                    <span className="text-xs font-medium text-[#94764C]">
                        {inventory.variantCount}{" "}
                        {inventory.variantCount === 1
                            ? "variant"
                            : "variants"}
                    </span>
                </td>
            </tr>

            {expanded && (
                <tr className="border-b border-[#EAE3D8] bg-[#F8F4ED]">
                    <td colSpan={7} className="px-4 py-5 sm:px-6">
                        <div className="overflow-hidden rounded-xl border border-[#EAE3D8] bg-[#FFFDF9]">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px] text-left">
                                    <thead className="bg-[#F2EBE0]">
                                    <tr>
                                        {[
                                            "SKU",
                                            "Size",
                                            "Color",
                                            "Available",
                                            "Reserved",
                                            "Total",
                                        ].map((heading) => (
                                            <th
                                                key={heading}
                                                className="whitespace-nowrap border-b border-[#E5DCCE] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#897968]"
                                            >
                                                {heading}
                                            </th>
                                        ))}

                                        <th className="whitespace-nowrap border-b border-[#E5DCCE] px-5 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[#897968]">
                                            Action
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {inventory.variants.map((variant) => {
                                        const variantInventory: Inventory = {
                                            inventoryId:
                                            variant.inventoryId,
                                            variantId:
                                            variant.variantId,
                                            productId:
                                            inventory.productId,
                                            productName:
                                            inventory.productName,
                                            sku: variant.sku,
                                            size: variant.size,
                                            color: variant.color,
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
                                                key={variant.inventoryId}
                                                className="border-t border-[#F0E9DF] transition-colors hover:bg-[#FAF7F2]"
                                            >
                                                <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-[#3D3028]">
                                                    {variant.sku}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-[#75675C]">
                                                    {variant.size}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-[#75675C]">
                                                    {variant.color}
                                                </td>

                                                <td className="px-5 py-4 text-sm font-medium tabular-nums text-[#3D3028]">
                                                    {variant.availableQuantity}
                                                </td>

                                                <td className="px-5 py-4 text-sm tabular-nums text-[#75675C]">
                                                    {variant.reservedQuantity}
                                                </td>

                                                <td className="px-5 py-4 text-sm font-medium tabular-nums text-[#3D3028]">
                                                    {variant.totalQuantity}
                                                </td>

                                                <td className="px-5 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            onRestock(
                                                                variantInventory
                                                            );
                                                        }}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5D8C4] bg-white text-[#94764C] transition-colors hover:border-[#B99A65] hover:bg-[#F5EFE5] hover:text-[#59452F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65]"
                                                        title="Adjust inventory"
                                                        aria-label={`Adjust inventory for ${variant.sku}`}
                                                    >
                                                        <RotateCw
                                                            size={16}
                                                            strokeWidth={1.8}
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}