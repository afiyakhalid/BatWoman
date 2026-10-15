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
    let dotStyle = "";

    if (availableQuantity === 0) {
        label = "OUT OF STOCK";
        style = "border-[#E8C9C5] bg-[#F9EDEA] text-[#9B5148]";
        dotStyle = "bg-[#B7655B]";
    } else if (availableQuantity <= 10) {
        label = "LOW STOCK";
        style = "border-[#E8D9B8] bg-[#F8F0DE] text-[#96743D]";
        dotStyle = "bg-[#B39250]";
    } else {
        label = "IN STOCK";
        style = "border-[#C9DCCB] bg-[#EDF4ED] text-[#55765A]";
        dotStyle = "bg-[#66866A]";
    }

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em]",
                style
            )}
        >
            <span
                aria-hidden="true"
                className={cn("h-1.5 w-1.5 rounded-full", dotStyle)}
            />
            {label}
        </span>
    );
}