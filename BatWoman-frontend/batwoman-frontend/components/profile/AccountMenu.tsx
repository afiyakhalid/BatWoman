"use client";

import { Package, Heart, MapPin, LogOut } from "lucide-react";

interface Props {
    onLogout: () => void;
}

export default function AccountMenu({
    onLogout,
}: Props) {

    return (

        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl">
                My Account
            </h2>

            <div className="space-y-4">

                <button className="flex w-full items-center gap-3 rounded-lg border p-4 transition hover:bg-neutral-50">
                    <Package />
                    My Orders
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg border p-4 transition hover:bg-neutral-50">
                    <Heart />
                    Wishlist
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg border p-4 transition hover:bg-neutral-50">
                    <MapPin />
                    Addresses
                </button>

                <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-lg border border-red-300 p-4 text-red-600 transition hover:bg-red-50"
                >
                    <LogOut />
                    Logout
                </button>

            </div>

        </div>

    );

}