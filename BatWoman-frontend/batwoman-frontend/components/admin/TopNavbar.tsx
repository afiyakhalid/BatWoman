"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

interface TopNavbarProps {
    onMenuClick?: () => void;
}

export default function TopNavbar({

    onMenuClick,

}: TopNavbarProps) {

    const pathname = usePathname();

    function getPageTitle() {

        if (pathname === "/admin")
            return "Dashboard";

        if (pathname.startsWith("/admin/products"))
            return "Products";

        if (pathname.startsWith("/admin/categories"))
            return "Categories";

        if (pathname.startsWith("/admin/orders"))
            return "Orders";

        if (pathname.startsWith("/admin/customers"))
            return "Customers";

        if (pathname.startsWith("/admin/inventory"))
            return "Inventory";

        if (pathname.startsWith("/admin/reviews"))
            return "Reviews";

        if (pathname.startsWith("/admin/payments"))
            return "Payments";

        if (pathname.startsWith("/admin/analytics"))
            return "Analytics";

        if (pathname.startsWith("/admin/settings"))
            return "Settings";

        return "Dashboard";

    }

    return (

        <header className="sticky top-0 z-30 flex h-24 items-center justify-between border-b border-neutral-200 bg-white px-10">

            {/* Left Section */}

            <div className="flex items-center gap-8">

                <div>

                    <h1 className="font-[var(--font-playfair)] text-4xl">

                        {getPageTitle()}

                    </h1>

                    <p className="mt-1 text-sm text-neutral-500">

                        Welcome back, Administrator.

                    </p>

                </div>

            </div>

            {/* Right Section */}

            <div className="flex items-center gap-6">

                {/* Search */}

                <div className="relative hidden lg:block">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="
                            h-12
                            w-80
                            rounded-xl
                            border
                            border-neutral-300
                            bg-neutral-50
                            pl-12
                            pr-4
                            text-sm
                            outline-none
                            transition-all
                            focus:border-black
                            focus:bg-white
                        "
                    />

                </div>

                {/* Notifications */}

                <button
                    className="
                        relative
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-neutral-300
                        bg-white
                        transition
                        hover:bg-neutral-100
                    "
                >

                    <Bell size={20} />

                    <span
                        className="
                            absolute
                            right-3
                            top-3
                            h-2
                            w-2
                            rounded-full
                            bg-red-500
                        "
                    />

                </button>
                                {/* Profile */}

                <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white px-4 py-2 shadow-sm transition hover:shadow-md">

                    <div className="flex flex-col items-end">

                        <p className="text-sm font-semibold text-neutral-900">

                            Afi Dory

                        </p>

                        <p className="text-xs text-neutral-500">

                            Administrator

                        </p>

                    </div>

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-black
                            text-lg
                            font-bold
                            text-white
                        "
                    >

                        A

                    </div>

                </div>

            </div>

        </header>

    );

}