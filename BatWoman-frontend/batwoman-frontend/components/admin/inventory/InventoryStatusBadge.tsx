"use client";

import { cn } from "@/lib/utils";

interface InventoryStatusBadgeProps {

    availableQuantity: number;

}

export default function InventoryStatusBadge({

    availableQuantity,

}: InventoryStatusBadgeProps) {

    let label = "";

    let style = "";

    if (availableQuantity === 0) {

        label = "OUT OF STOCK";

        style =
            "bg-red-100 text-red-800 border-red-200";

    } else if (availableQuantity <= 10) {

        label = "LOW STOCK";

        style =
            "bg-yellow-100 text-yellow-800 border-yellow-200";

    } else {

        label = "IN STOCK";

        style =
            "bg-green-100 text-green-800 border-green-200";

    }

    return (

        <span
            className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                style
            )}
        >
            {label}
        </span>

    );

}