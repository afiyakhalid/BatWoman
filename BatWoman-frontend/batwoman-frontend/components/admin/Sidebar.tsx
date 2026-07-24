"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
    LayoutDashboard,
    Package,
    FolderTree,
    ShoppingBag,
    Users,
    Boxes,
    Star,
    CreditCard,
    ChartNoAxesCombined,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Store,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/useLogout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: number | string;
}

const navigation: NavItem[] = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
        // Optional badge count example: badge: 12
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "Inventory",
        href: "/admin/inventory",
        icon: Boxes,
    },
    {
        title: "Reviews",
        href: "/admin/reviews",
        icon: Star,
    },
    {
        title: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: ChartNoAxesCombined,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function Sidebar({
    collapsed,
    onToggle,
}: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const logout = useLogout();
    const { data: user } = useCurrentUser();

    // Derived user details with safe fallbacks
    const avatarInitial = user?.firstName
        ? user.firstName.charAt(0).toUpperCase()
        : "A";

    const fullName = user?.firstName
        ? `${user.firstName} ${user.lastName ?? ""}`.trim()
        : "Afi Dory";

    const roleName = user?.role ?? "Administrator";

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-neutral-800 bg-black text-white transition-all duration-300",
                collapsed ? "w-24" : "w-72"
            )}
        >
            {/* Logo */}
            <div className="flex h-24 items-center justify-between border-b border-neutral-800 px-6">
                {!collapsed && (
                    <div>
                        <h1 className="font-[var(--font-playfair)] text-3xl tracking-widest">
                            BATWOMAN
                        </h1>
                        <p className="mt-1 text-xs uppercase tracking-[0.3rem] text-neutral-500">
                            ADMIN PANEL
                        </p>
                    </div>
                )}

                <button
                    onClick={onToggle}
                    className="rounded-lg p-2 transition hover:bg-neutral-900"
                >
                    {collapsed ? (
                        <ChevronRight size={20} />
                    ) : (
                        <ChevronLeft size={20} />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-8">
                <ul className="space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        const active =
                            item.href === "/admin"
                                ? pathname === "/admin"
                                : pathname === item.href ||
                                  pathname.startsWith(item.href + "/");

                        return (
                            <li key={item.title}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "group flex items-center rounded-xl transition-all duration-200",
                                        collapsed
                                            ? "justify-center p-4"
                                            : "gap-4 px-5 py-4",
                                        active
                                            ? "bg-white text-black shadow-lg"
                                            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                                    )}
                                >
                                    <Icon
                                        size={22}
                                        className="shrink-0"
                                    />

                                    {!collapsed && (
                                        <span className="flex-1 text-sm font-medium">
                                            {item.title}
                                        </span>
                                    )}

                                    {!collapsed && item.badge !== undefined && (
                                        <span
                                            className={cn(
                                                "ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
                                                active
                                                    ? "bg-black text-white"
                                                    : "bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 group-hover:text-white"
                                            )}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-neutral-800 p-4">
                {/* Profile Card */}
                {!collapsed ? (
                    <div className="mb-4 flex items-center gap-4 rounded-xl bg-neutral-900 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-black shrink-0">
                            {avatarInitial}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">
                                {fullName}
                            </p>
                            <p className="text-xs text-neutral-400 truncate capitalize">
                                {roleName}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-black">
                            {avatarInitial}
                        </div>
                    </div>
                )}

                {/* View Store Button */}
                <button
                    onClick={() => router.push("/")}
                    className={cn(
                        "mb-2 flex w-full items-center rounded-xl transition-all duration-200 text-neutral-400 hover:bg-neutral-900 hover:text-white",
                        collapsed
                            ? "justify-center p-4"
                            : "gap-4 px-5 py-3.5"
                    )}
                >
                    <Store size={22} className="shrink-0" />

                    {!collapsed && (
                        <span className="text-sm font-medium">
                            View Store
                        </span>
                    )}
                </button>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className={cn(
                        "flex w-full items-center rounded-xl transition-all duration-200 text-red-400 hover:bg-red-500 hover:text-white",
                        collapsed
                            ? "justify-center p-4"
                            : "gap-4 px-5 py-3.5"
                    )}
                >
                    <LogOut size={22} className="shrink-0" />

                    {!collapsed && (
                        <span className="text-sm font-medium">
                            Logout
                        </span>
                    )}
                </button>
            </div>
        </aside>
    );
}