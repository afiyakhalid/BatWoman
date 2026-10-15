
"use client";

import { Search } from "lucide-react";

interface OrderToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
}

export default function OrderToolbar({
                                         search,
                                         onSearchChange,
                                         status,
                                         onStatusChange,
                                     }: OrderToolbarProps) {
    return (
        <div className="mb-7 space-y-6 xl:mb-8">
            {/* Heading */}
            <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A68A64] sm:text-xs">
                    Store Management
                </p>

                <h1 className="font-[var(--font-playfair)] text-3xl font-medium tracking-tight text-[#35291F] sm:text-4xl lg:text-5xl">
                    Orders
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#857565] sm:mt-3 sm:text-base">
                    Manage customer orders and update their status.
                </p>
            </div>

            {/* Search and filters */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_220px]">
                <div className="relative min-w-0">
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
                        placeholder="Search orders..."
                        aria-label="Search orders"
                        className="h-12 w-full min-w-0 rounded-xl border border-[#E4D9CA] bg-white pl-11 pr-4 text-sm text-[#35291F] shadow-sm outline-none transition-colors placeholder:text-[#B3A696] hover:border-[#D4C4B0] focus:border-[#A68A64] focus:ring-2 focus:ring-[#A68A64]/20"
                    />
                </div>

                <select
                    value={status}
                    onChange={(event) =>
                        onStatusChange(event.target.value)
                    }
                    aria-label="Filter orders by status"
                    className="h-12 w-full min-w-0 rounded-xl border border-[#E4D9CA] bg-white px-4 text-sm text-[#35291F] shadow-sm outline-none transition-colors hover:border-[#D4C4B0] focus:border-[#A68A64] focus:ring-2 focus:ring-[#A68A64]/20"
                >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>
        </div>
    );
}
