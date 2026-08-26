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

        <>

            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="font-[var(--font-playfair)] text-5xl">
                        Products
                    </h1>

                    <p className="mt-3 text-neutral-500">
                        Manage products for your store.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onAddProduct}
                    className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-neutral-800"
                >

                    <Plus size={18} />

                    Add Product

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
                    placeholder="Search products..."
                    className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-black"
                />

            </div>

        </>

    );

}