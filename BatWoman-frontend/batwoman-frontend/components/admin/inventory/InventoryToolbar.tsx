"use client";

import { Search } from "lucide-react";

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

        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row md:items-center md:justify-between">

            <div className="relative w-full md:max-w-md">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    className="w-full rounded-xl border border-neutral-200 py-3 pl-11 pr-4 outline-none transition focus:border-black"
                />

            </div>

            <select
                value={filter}
                onChange={(e) =>
                    onFilterChange(e.target.value)
                }
                className="rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
            >

                <option value="ALL">

                    All Inventory

                </option>

                <option value="IN_STOCK">

                    In Stock

                </option>

                <option value="LOW_STOCK">

                    Low Stock

                </option>

                <option value="OUT_OF_STOCK">

                    Out Of Stock

                </option>

            </select>

        </div>

    );

}