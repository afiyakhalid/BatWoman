"use client";

import { Plus, Search, X, Layers3 } from "lucide-react";

interface CategoryToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    onAddCategory: () => void;
}

export default function CategoryToolbar({
                                            search,
                                            onSearchChange,
                                            onAddCategory,
                                        }: CategoryToolbarProps) {
    return (
        <section className="mb-6 min-w-0 space-y-5 sm:mb-8 sm:space-y-6">
            {/* Page heading and action */}
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                    <div className="mb-3 flex items-center gap-2">
                        <Layers3 size={15} className="text-[#A18A6E]" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18A6E]">
              Store management
            </span>
                    </div>

                    <h1 className="font-[var(--font-playfair)] text-3xl font-medium tracking-tight text-[#30271F] sm:text-4xl lg:text-5xl">
                        Categories
                    </h1>

                    <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#8B8174] sm:mt-3 sm:text-sm">
                        Organize your collections and manage the categories
                        displayed across your store.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onAddCategory}
                    className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#493A2B] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#35291F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A18A6E] focus-visible:ring-offset-2 sm:w-auto sm:px-6"
                >
                    <Plus size={17} strokeWidth={2} />
                    Add Category
                </button>
            </div>

            {/* Search */}
            <div className="rounded-2xl border border-[#E7DDD0] bg-[#FFFDFA] p-3 sm:p-4">
                <div className="relative">
                    <Search
                        size={17}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A18A6E]"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search categories..."
                        aria-label="Search categories"
                        className="h-11 w-full rounded-xl border border-[#E5D8C6] bg-white pl-10 pr-10 text-sm text-[#30271F] outline-none transition-colors placeholder:text-[#B1A596] focus:border-[#A18A6E] focus:ring-2 focus:ring-[#A18A6E]/15"
                    />

                    {search.length > 0 && (
                        <button
                            type="button"
                            onClick={() => onSearchChange("")}
                            aria-label="Clear category search"
                            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[#8B8174] transition-colors hover:bg-[#F5EDE2] hover:text-[#493A2B]"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                <p className="mt-2 px-1 text-[10px] text-[#A09484] sm:text-xs">
                    Find a category by entering its name or search term.
                </p>
            </div>
        </section>
    );
}