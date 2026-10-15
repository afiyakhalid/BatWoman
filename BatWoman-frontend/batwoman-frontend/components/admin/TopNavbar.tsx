
"use client";

import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";

interface TopNavbarProps {
    onMenuClick?: () => void;
}

export default function TopNavbar({
                                      onMenuClick,
                                  }: TopNavbarProps) {
    const pathname = usePathname();

    function getPageTitle() {
        if (pathname === "/admin") return "Dashboard";
        if (pathname.startsWith("/admin/products")) return "Products";
        if (pathname.startsWith("/admin/categories")) return "Categories";
        if (pathname.startsWith("/admin/orders")) return "Orders";
        if (pathname.startsWith("/admin/customers")) return "Customers";
        if (pathname.startsWith("/admin/inventory")) return "Inventory";
        if (pathname.startsWith("/admin/reviews")) return "Reviews";
        if (pathname.startsWith("/admin/payments")) return "Payments";
        if (pathname.startsWith("/admin/analytics")) return "Analytics";
        if (pathname.startsWith("/admin/settings")) return "Settings";

        return "Dashboard";
    }

    return (
        <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between gap-3 border-b border-[#E5D9C9] bg-[#F7F1E8]/95 px-4 backdrop-blur-xl sm:min-h-[84px] sm:px-6 lg:px-8">
            {/* Left section */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#6D6256] transition hover:bg-[#EDE3D6] md:hidden"
                >
                    <Menu size={23} strokeWidth={1.7} />
                </button>

                <div className="min-w-0">
                    <p className="mb-0.5 hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A09484] sm:block">
                        Zubayda Administration
                    </p>

                    <h1 className="truncate font-[var(--font-playfair)] text-xl text-[#34291E] sm:text-2xl lg:text-3xl">
                        {getPageTitle()}
                    </h1>

                    <p className="mt-0.5 hidden text-xs text-[#8B8174] sm:block sm:text-sm">
                        Manage your store with confidence.
                    </p>
                </div>
            </div>

            {/* Right section */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <div className="relative hidden xl:block">
                    <Search
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A09484]"
                    />
                    <input
                        type="search"
                        placeholder="Search..."
                        aria-label="Search admin"
                        className="h-10 w-56 rounded-full border border-[#E1D4C3] bg-[#FBF8F3] pl-10 pr-4 text-sm text-[#34291E] outline-none transition placeholder:text-[#A09484] focus:border-[#A88A65] focus:ring-2 focus:ring-[#A88A65]/10"
                    />
                </div>

                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5D9C9] bg-[#FBF8F3] text-[#6D6256] transition hover:bg-[#EDE3D6]"
                >
                    <Bell size={18} strokeWidth={1.7} />
                    <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border border-[#FBF8F3] bg-[#A65D50]" />
                </button>

                <div className="hidden items-center gap-3 border-l border-[#E5D9C9] pl-4 sm:flex">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-[#34291E]">
                            Store Admin
                        </p>
                        <p className="text-[11px] text-[#8B8174]">
                            Administrator
                        </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCC9AD] bg-[#EDE2D2] font-[var(--font-playfair)] text-lg text-[#745735]">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
