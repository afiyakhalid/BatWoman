"use client";

import { Search } from "lucide-react";

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

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}

            <div>

                <h1 className="font-[var(--font-playfair)] text-5xl">

                    Payments

                </h1>

                <p className="mt-3 text-neutral-500">

                    Track all customer payments and transactions.

                </p>

            </div>

            {/* Right */}

            <div className="flex flex-col gap-4 lg:flex-row">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onSearchChange(e.target.value)
                        }
                        placeholder="Search payments..."
                        className="w-72 rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-black"
                    />

                </div>

                <select
                    value={status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        onStatusChange(e.target.value)
                    }
                    className="rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-black"
                >

                    <option value="ALL">
                        All Statuses
                    </option>

                    <option value="SUCCESS">
                        Success
                    </option>

                    <option value="PENDING">
                        Pending
                    </option>

                    <option value="FAILED">
                        Failed
                    </option>

                    <option value="REFUNDED">
                        Refunded
                    </option>

                </select>

            </div>

        </div>

    );

}