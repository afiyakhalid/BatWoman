"use client";

import { cn } from "@/lib/utils";

interface PaymentStatusBadgeProps {
    status: string;
}

export default function PaymentStatusBadge({
                                               status,
                                           }: PaymentStatusBadgeProps) {
    const normalizedStatus = status.toUpperCase();

    const styles: Record<string, string> = {
        SUCCESS:
            "bg-[#EAF1E8] text-[#4E6B4B] border-[#D5E3D1]",
        PENDING:
            "bg-[#F8F0DF] text-[#8C6B35] border-[#EADCB9]",
        FAILED:
            "bg-[#F7EAE6] text-[#A45143] border-[#EBD3CC]",
        REFUNDED:
            "bg-[#F0EBE4] text-[#6D5B79] border-[#DFD5E8]",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap",
                styles[normalizedStatus] ??
                "bg-[#F4F1EC] text-[#6F6256] border-[#E5DDD2]"
            )}
        >
            {status.replaceAll("_", " ")}
        </span>
    );
}