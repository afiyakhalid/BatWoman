
"use client";

import { Plus, Search } from "lucide-react";

interface ProductToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onAddProduct: () => void;
}

export default function ProductToolbar({
                                           search,
                                           onSearchChange,
                                           onAddProduct,
                                       }: ProductToolbarProps) {
    return (
        <div className="mb-7 space-y-6 sm:mb-8">
            {/* Page heading and action */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A68A64] sm:text-xs">
                        Store Management
                    </p>

                    <h1 className="font-[var(--font-playfair)] text-3xl font-medium tracking-tight text-[#35291F] sm:text-4xl lg:text-5xl">
                        Products
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#857565] sm:mt-3 sm:text-base">
                        Manage products for your store.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onAddProduct}
                    className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-[#A68A64] bg-[#A68A64] px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:border-[#8F7350] hover:bg-[#8F7350] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A68A64] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[170px]"
                >
                    <Plus size={18} strokeWidth={1.8} />
                    Add Product
                </button>
            </div>

            {/* Search */}
            <div className="relative w-full">
                <Search
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A09280]"
                />

                <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="h-12 w-full min-w-0 rounded-xl border border-[#E4D9CA] bg-white pl-11 pr-4 text-sm text-[#35291F] shadow-sm outline-none transition-colors placeholder:text-[#B3A696] hover:border-[#D4C4B0] focus:border-[#A68A64] focus:ring-2 focus:ring-[#A68A64]/20 sm:h-[52px]"
                />
            </div>
        </div>
    );
}
