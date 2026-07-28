"use client";

import { useRouter } from "next/navigation";
import {
    Package,
    Heart,
    MapPin,
    LogOut,
} from "lucide-react";

interface Props {
    onLogout: () => void;
}

export default function AccountMenu({
                                        onLogout,
                                    }: Props) {

    const router = useRouter();

    return (

        <div className="rounded-xl border border-neutral-200 bg-white p-8">

            <h2 className="mb-8 font-[var(--font-playfair)] text-3xl">
                My Account
            </h2>

            <div className="space-y-4">

                <button
                    onClick={() => router.push("/customer/orders")}
                    className="flex w-full items-center gap-3 rounded-lg border p-4 transition hover:bg-neutral-50"
                >
                    <Package size={20} />
                    My Orders
                </button>

                <button
                    onClick={() => router.push("/customer/wishlist")}
                    className="flex w-full items-center gap-3 rounded-lg border p-4 transition hover:bg-neutral-50"
                >
                    <Heart size={20} />
                    Wishlist
                </button>

                <button
                    onClick={() => router.push("/customer/address")}
                    className="flex w-full items-center gap-3 rounded-lg border p-4 transition hover:bg-neutral-50"
                >
                    <MapPin size={20} />
                    Addresses
                </button>

                <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-lg border border-red-300 p-4 text-red-600 transition hover:bg-red-50"
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </div>

        </div>

    );

}