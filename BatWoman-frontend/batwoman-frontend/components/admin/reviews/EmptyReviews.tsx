"use client";

import { MessageSquareText, Star } from "lucide-react";

export default function EmptyReviews() {
    return (
        <div className="rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] px-6 py-20 text-center shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:py-24">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E8DCC7] bg-[#F5EFE5]">
                <MessageSquareText
                    size={27}
                    strokeWidth={1.5}
                    className="text-[#94764C]"
                />

                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#FFFDF9] bg-[#EDE0C9]">
                    <Star
                        size={13}
                        strokeWidth={1.8}
                        className="fill-[#94764C] text-[#94764C]"
                    />
                </span>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#94764C]">
                Customer Feedback
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#3D3028] sm:text-3xl">
                No Reviews Yet
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8A7A6C]">
                Customer reviews will appear here once shoppers share
                their experiences with your products.
            </p>

            <div className="mx-auto mt-7 h-px w-16 bg-[#D9C6A5]" />
        </div>
    );
}