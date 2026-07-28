"use client";

import { cn } from "@/lib/utils";

interface PaymentMethodBadgeProps {
    method: string;
}

export default function PaymentMethodBadge({
    method,
}: PaymentMethodBadgeProps) {

    const styles: Record<string, string> = {

        RAZORPAY:
            "bg-sky-100 text-sky-800 border-sky-200",

        CARD:
            "bg-indigo-100 text-indigo-800 border-indigo-200",

        UPI:
            "bg-emerald-100 text-emerald-800 border-emerald-200",

        NET_BANKING:
            "bg-orange-100 text-orange-800 border-orange-200",

        WALLET:
            "bg-pink-100 text-pink-800 border-pink-200",

        CASH_ON_DELIVERY:
            "bg-neutral-100 text-neutral-800 border-neutral-300",

    };

    return (

        <span
            className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                styles[method] ??
                    "bg-neutral-100 text-neutral-700 border-neutral-200"
            )}
        >
            {method.replaceAll("_", " ")}
        </span>

    );

}