"use client";

import { cn } from "@/lib/utils";

interface PaymentMethodBadgeProps {
    method: string;
}

export default function PaymentMethodBadge({
                                               method,
                                           }: PaymentMethodBadgeProps) {
    const normalizedMethod = method.toUpperCase();

    const styles: Record<string, string> = {
        RAZORPAY:
            "bg-[#F5EFE5] text-[#80643D] border-[#E8D9BF]",
        CARD:
            "bg-[#F0EBE4] text-[#59483A] border-[#E2D6C6]",
        UPI:
            "bg-[#EAF1E8] text-[#4E6B4B] border-[#D5E3D1]",
        NET_BANKING:
            "bg-[#F7EEE3] text-[#956A3D] border-[#EAD8C1]",
        WALLET:
            "bg-[#F3EAF0] text-[#80566F] border-[#E6D5E0]",
        CASH_ON_DELIVERY:
            "bg-[#F4F1EC] text-[#6F6256] border-[#E5DDD2]",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap",
                styles[normalizedMethod] ??
                "bg-[#F4F1EC] text-[#6F6256] border-[#E5DDD2]"
            )}
        >
            {method.replaceAll("_", " ")}
        </span>
    );
}