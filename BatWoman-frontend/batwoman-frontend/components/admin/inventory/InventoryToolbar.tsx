"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface InventoryToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    filter: string;
    onFilterChange: (value: string) => void;
}

export default function InventoryToolbar({
                                             search,
                                             onSearchChange,
                                             filter,
                                             onFilterChange,
                                         }: InventoryToolbarProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-4 shadow-[0_2px_10px_rgba(61,48,40,0.03)] sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
                <Search
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8874]"
                />

                <input
                    type="text"
                    placeholder="Search products..."
                    aria-label="Search inventory products"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#E5DCCE] bg-white pl-11 pr-4 text-sm text-[#3D3028] placeholder:text-[#A79A8C] outline-none transition-colors duration-200 focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15"
                />
            </div>

            <div className="flex w-full items-center gap-3 lg:w-auto">
                <div className="flex h-12 shrink-0 items-center justify-center rounded-xl border border-[#E5DCCE] bg-[#F7F2EA] px-3 text-[#94764C]">
                    <SlidersHorizontal
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </div>

                <select
                    aria-label="Filter inventory by stock status"
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="h-12 min-w-0 w-full cursor-pointer rounded-xl border border-[#E5DCCE] bg-white px-4 text-sm font-medium text-[#59483A] outline-none transition-colors duration-200 focus:border-[#B99A65] focus:ring-2 focus:ring-[#B99A65]/15 lg:w-52"
                >
                    <option value="ALL">All Inventory</option>
                    <option value="IN_STOCK">In Stock</option>
                    <option value="LOW_STOCK">Low Stock</option>
                    <option value="OUT_OF_STOCK">Out Of Stock</option>
                </select>
            </div>
        </div>
    );
}