"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface PaymentToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
}

export default function PaymentToolbar({
                                           search,
                                           onSearchChange,
                                           status,
                                           onStatusChange,
                                       }: PaymentToolbarProps) {
    return (
        <section className="mb-8 space-y-6">
            {/* Page heading */}
            <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A58A60]">
                    Finance &amp; Transactions
                </p>

                <h1 className="font-[var(--font-playfair)] text-3xl text-[#3D3028] sm:text-4xl lg:text-5xl">
                    Payments
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8A7A6C] sm:text-base">
                    Track customer payments, review transaction statuses,
                    and inspect payment records.
                </p>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col gap-4 rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-4 shadow-[0_2px_12px_rgba(61,48,40,0.03)] sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-md">
                    <Search
                        size={18}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A58A60]"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        placeholder="Search payments..."
                        aria-label="Search payments"
                        className="h-12 w-full rounded-xl border border-[#E5DDD2] bg-white pl-11 pr-4 text-sm text-[#3D3028] outline-none transition placeholder:text-[#A89A8B] hover:border-[#D9C6A5] focus:border-[#B99A68] focus:ring-2 focus:ring-[#B99A68]/15"
                    />
                </div>

                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
                    <label
                        htmlFor="payment-status-filter"
                        className="flex shrink-0 items-center gap-2 text-xs font-medium text-[#8A7A6C]"
                    >
                        <SlidersHorizontal size={15} />
                        Filter by status
                    </label>

                    <select
                        id="payment-status-filter"
                        value={status}
                        onChange={(e) =>
                            onStatusChange(e.target.value)
                        }
                        className="h-12 w-full cursor-pointer rounded-xl border border-[#E5DDD2] bg-white px-4 text-sm text-[#59483A] outline-none transition hover:border-[#D9C6A5] focus:border-[#B99A68] focus:ring-2 focus:ring-[#B99A68]/15 sm:min-w-[190px] lg:w-auto"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="SUCCESS">Success</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Failed</option>
                        <option value="REFUNDED">Refunded</option>
                    </select>
                </div>
            </div>
        </section>
    );
}