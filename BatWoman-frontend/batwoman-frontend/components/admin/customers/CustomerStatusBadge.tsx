"use client";

import { cn } from "@/lib/utils";

interface CustomerStatusBadgeProps {
    active: boolean;
    verified: boolean;
}

export default function CustomerStatusBadge({
                                                active,
                                                verified,
                                            }: CustomerStatusBadgeProps) {
    let label = "";
    let style = "";

    if (!active) {
        label = "INACTIVE";
        style = "border-[#E8C9C5] bg-[#F9EDEA] text-[#9B5148]";
    } else if (!verified) {
        label = "UNVERIFIED";
        style = "border-[#E8D9B8] bg-[#F8F0DE] text-[#96743D]";
    } else {
        label = "ACTIVE";
        style = "border-[#C9DCCB] bg-[#EDF4ED] text-[#55765A]";
    }

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em]",
                style
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    !active
                        ? "bg-[#B7655B]"
                        : !verified
                            ? "bg-[#B39250]"
                            : "bg-[#66866A]"
                )}
            />

            {label}
        </span>
    );
}