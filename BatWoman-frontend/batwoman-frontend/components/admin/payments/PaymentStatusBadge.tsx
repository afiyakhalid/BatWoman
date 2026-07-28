"use client";

import { cn } from "@/lib/utils";

interface PaymentStatusBadgeProps {
    status: string;
}

export default function PaymentStatusBadge({
    status,
}: PaymentStatusBadgeProps) {

    const styles: Record<string, string> = {
        SUCCESS:
            "bg-green-100 text-green-800 border-green-200",

        PENDING:
            "bg-yellow-100 text-yellow-800 border-yellow-200",

        FAILED:
            "bg-red-100 text-red-800 border-red-200",

        REFUNDED:
            "bg-purple-100 text-purple-800 border-purple-200",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                styles[status] ??
                    "bg-neutral-100 text-neutral-700 border-neutral-200"
            )}
        >
            {status}
        </span>
    );
}