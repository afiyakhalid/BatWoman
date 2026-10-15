
"use client";

import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
    status: string;
}

export default function OrderStatusBadge({
                                             status,
                                         }: OrderStatusBadgeProps) {
    const styles: Record<string, string> = {
        PENDING:
            "border-[#E5D0A7] bg-[#FBF1DD] text-[#8A682F]",

        PROCESSING:
            "border-[#D8C7AB] bg-[#F2E9DC] text-[#795C3D]",

        SHIPPED:
            "border-[#D8D4E7] bg-[#F0EDF7] text-[#625584]",

        DELIVERED:
            "border-[#C8D8C3] bg-[#EAF2E8] text-[#426343]",

        CANCELLED:
            "border-[#E7C9C5] bg-[#F9ECEA] text-[#9A4F48]",
    };

    const normalizedStatus = status.toUpperCase();

    return (
        <span
            className={cn(
                "inline-flex max-w-full items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] sm:px-3 sm:text-xs sm:tracking-wide",
                styles[normalizedStatus] ??
                "border-[#E4D9CA] bg-[#F5F0E8] text-[#766656]"
            )}
        >
            {status.replace(/_/g, " ")}
        </span>
    );
}
