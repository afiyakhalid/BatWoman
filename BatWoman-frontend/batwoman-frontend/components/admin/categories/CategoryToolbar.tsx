"use client";

import { Plus, Search } from "lucide-react";

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
    <>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}

            <div>

                <h1 className="font-[var(--font-playfair)] text-5xl">
                    Categories
                </h1>

                <p className="mt-3 text-neutral-500">
                    Manage product categories for your store.
                </p>

            </div>

            {/* Right */}

            <button
                type="button"
                onClick={onAddCategory}
                className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-neutral-800"
            >
                <Plus size={18} />
                Add Category
            </button>

        </div>

        <div className="relative">

            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
                type="text"
                value={search}
                onChange={(e) =>
                    onSearchChange(e.target.value)
                }
                placeholder="Search categories..."
                className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-black"
            />

        </div>

    </>
);

}