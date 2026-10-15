"use client";

import { Search, Star } from "lucide-react";

interface Props {
    search: string;
    setSearch: (value: string) => void;
    rating: number;
    setRating: (rating: number) => void;
}

export default function ReviewFilters({
                                          search,
                                          setSearch,
                                          rating,
                                          setRating,
                                      }: Props) {
    return (
        <div className="space-y-5 rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-4 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-5">
            <div className="relative w-full">
                <Search
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8874]"
                />

                <input
                    type="text"
                    placeholder="Search reviews..."
                    aria-label="Search reviews"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#E5DCCE] bg-white pl-11 pr-4 text-sm text-[#3D3028] placeholder:text-[#A79A8C] outline-none transition-colors duration-200 focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15"
                />
            </div>

            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#897968]">
                    Filter by rating
                </p>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setRating(0)}
                        aria-pressed={rating === 0}
                        className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] ${
                            rating === 0
                                ? "border-[#94764C] bg-[#94764C] text-white"
                                : "border-[#E5DCCE] bg-white text-[#75675C] hover:border-[#B99A65] hover:bg-[#F7F2EA]"
                        }`}
                    >
                        All
                    </button>

                    {[5, 4, 3, 2, 1].map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setRating(value)}
                            aria-label={`${value} star${value === 1 ? "" : "s"}`}
                            aria-pressed={rating === value}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] ${
                                rating === value
                                    ? "border-[#94764C] bg-[#94764C] text-white"
                                    : "border-[#E5DCCE] bg-white text-[#75675C] hover:border-[#B99A65] hover:bg-[#F7F2EA]"
                            }`}
                        >
                            <span>{value}</span>
                            <Star
                                size={14}
                                className={
                                    rating === value
                                        ? "fill-white text-white"
                                        : "fill-[#C2A16A] text-[#C2A16A]"
                                }
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}