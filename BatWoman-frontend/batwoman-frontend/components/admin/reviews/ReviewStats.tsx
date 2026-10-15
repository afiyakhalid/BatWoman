"use client";

import {
    MessageSquareText,
    Star,
    PackageCheck,
} from "lucide-react";

interface Props {
    totalReviews: number;
    averageRating: number;
    productsReviewed: number;
}

export default function ReviewStats({
                                        totalReviews,
                                        averageRating,
                                        productsReviewed,
                                    }: Props) {
    const cards = [
        {
            title: "Total Reviews",
            value: totalReviews,
            icon: MessageSquareText,
        },
        {
            title: "Average Rating",
            value: averageRating.toFixed(1),
            icon: Star,
        },
        {
            title: "Products Reviewed",
            value: productsReviewed,
            icon: PackageCheck,
        },
    ];

    return (
        <section
            aria-label="Review statistics"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="group rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] transition-all duration-200 hover:border-[#D9C6A5] hover:shadow-[0_6px_20px_rgba(61,48,40,0.06)] sm:p-6"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8A7A6C]">
                                    {card.title}
                                </p>

                                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#3D3028] tabular-nums sm:text-4xl">
                                    {typeof card.value === "number"
                                        ? card.value.toLocaleString("en-IN")
                                        : card.value}
                                </h2>

                                {card.title === "Average Rating" && (
                                    <p className="mt-2 text-xs text-[#9A8B7B]">
                                        Out of 5.0
                                    </p>
                                )}
                            </div>

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E8DCC7] bg-[#F5EFE5] transition-colors duration-200 group-hover:bg-[#EFE3D0] sm:h-14 sm:w-14">
                                <Icon
                                    size={23}
                                    strokeWidth={1.6}
                                    className="text-[#94764C]"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        <div className="mt-5 h-px w-full bg-[#EEE7DD]" />
                    </div>
                );
            })}
        </section>
    );
}