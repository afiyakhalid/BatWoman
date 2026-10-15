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
    X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/useLogout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
}

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: number | string;
}

const navigation: NavItem[] = [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Products", href: "/admin/products", icon: Package },
    { title: "Categories", href: "/admin/categories", icon: FolderTree },
    { title: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { title: "Customers", href: "/admin/customers", icon: Users },
    { title: "Inventory", href: "/admin/inventory", icon: Boxes },
    { title: "Reviews", href: "/admin/reviews", icon: Star },
    { title: "Payments", href: "/admin/payments", icon: CreditCard },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: ChartNoAxesCombined,
    },
    { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar({
                                    collapsed,
                                    onToggle,
                                    mobileOpen,
                                    onMobileClose,
                                }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const logout = useLogout();

    const { data: user } = useCurrentUser();

    const avatarInitial = user?.firstName
        ? user.firstName.charAt(0).toUpperCase()
        : "A";

    const fullName = user?.firstName
        ? `${user.firstName} ${user.lastName ?? ""}`.trim()
        : "Administrator";

    const roleName = user?.role ?? "Administrator";

    function isActive(href: string) {
        return href === "/admin"
            ? pathname === "/admin"
            : pathname === href || pathname.startsWith(`${href}/`);
    }

    function navigateToStore() {
        onMobileClose();
        router.push("/");
    }

    function handleLogout() {
        onMobileClose();
        logout();
    }

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 flex h-dvh flex-col",
                "border-r border-[#E5D8C6] bg-[#F7F1E7] text-[#30271F]",
                "transition-[width,transform] duration-300 ease-in-out",
                "w-[272px]",
                mobileOpen
                    ? "translate-x-0"
                    : "-translate-x-full md:translate-x-0",
                collapsed ? "md:w-20" : "md:w-[272px]"
            )}
        >
            {/* Brand header */}
            <div
                className={cn(
                    "flex h-[88px] shrink-0 items-center border-b border-[#E5D8C6]",
                    "px-4",
                    collapsed ? "md:justify-center" : "justify-between"
                )}
            >
                <div
                    className={cn(
                        "min-w-0",
                        collapsed && "md:hidden"
                    )}
                >
                    <p className="font-[var(--font-playfair)] text-[25px] tracking-[0.13em] text-[#8D6B43]">
                        ZUBAYDA
                    </p>

                    <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-[#8C7A67]">
                        BY A3 · ADMINISTRATION
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        if (mobileOpen) {
                            onMobileClose();
                        } else {
                            onToggle();
                        }
                    }}
                    aria-label={
                        mobileOpen
                            ? "Close navigation"
                            : collapsed
                                ? "Expand sidebar"
                                : "Collapse sidebar"
                    }
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5D8C6] text-[#8D6B43] transition hover:bg-[#EEE3D3]"
                >
          <span className="md:hidden">
            <X size={18} />
          </span>

                    <span className="hidden md:block">
            {collapsed ? (
                <ChevronRight size={18} />
            ) : (
                <ChevronLeft size={18} />
            )}
          </span>
                </button>
            </div>

            {/* Navigation */}
            <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-6">
                <p
                    className={cn(
                        "mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A18D76]",
                        collapsed && "md:hidden"
                    )}
                >
                    Store Management
                </p>

                <ul className="space-y-1.5">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onMobileClose}
                                    title={collapsed ? item.title : undefined}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "group flex min-h-12 items-center rounded-full",
                                        "transition-all duration-200",
                                        collapsed
                                            ? "justify-center px-3 md:px-0"
                                            : "gap-3 px-4",
                                        active
                                            ? "border border-[#DDC7A8] bg-[#EEE2D0] text-[#30271F] shadow-sm"
                                            : "border border-transparent text-[#66584A] hover:border-[#E7D8C4] hover:bg-[#F0E7DA]"
                                    )}
                                >
                                    <Icon
                                        size={20}
                                        strokeWidth={1.7}
                                        className={cn(
                                            "shrink-0",
                                            active
                                                ? "text-[#8D6B43]"
                                                : "text-[#66584A]"
                                        )}
                                    />

                                    <span
                                        className={cn(
                                            "min-w-0 flex-1 truncate text-sm font-medium",
                                            collapsed && "md:hidden"
                                        )}
                                    >
                    {item.title}
                  </span>

                                    {item.badge !== undefined && (
                                        <span
                                            className={cn(
                                                "rounded-full bg-[#8D6B43] px-2 py-0.5 text-xs text-white",
                                                collapsed && "md:hidden"
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

            {/* Account and actions */}
            <div className="shrink-0 border-t border-[#E5D8C6] p-3">
                <div
                    className={cn(
                        "mb-3 flex items-center gap-3 rounded-full border border-[#E8DACA] bg-[#F0E6D9] p-3",
                        collapsed && "md:justify-center md:px-1"
                    )}
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#94734C] font-medium text-white">
                        {avatarInitial}
                    </div>

                    <div
                        className={cn(
                            "min-w-0 flex-1",
                            collapsed && "md:hidden"
                        )}
                    >
                        <p className="truncate text-sm font-semibold text-[#30271F]">
                            {fullName}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] uppercase tracking-wide text-[#8C7A67]">
                            {roleName}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={navigateToStore}
                    title={collapsed ? "View Store" : undefined}
                    className={cn(
                        "flex min-h-11 w-full items-center rounded-full",
                        "text-[#66584A] transition hover:bg-[#EEE3D3]",
                        collapsed
                            ? "justify-center px-3 md:px-0"
                            : "gap-3 px-4"
                    )}
                >
                    <Store size={19} strokeWidth={1.7} />

                    <span className={cn("text-sm font-medium", collapsed && "md:hidden")}>
            View Store
          </span>
                </button>

                <button
                    type="button"
                    onClick={handleLogout}
                    title={collapsed ? "Logout" : undefined}
                    className={cn(
                        "mt-1 flex min-h-11 w-full items-center rounded-full",
                        "text-[#A34E3E] transition hover:bg-[#F4E3DE]",
                        collapsed
                            ? "justify-center px-3 md:px-0"
                            : "gap-3 px-4"
                    )}
                >
                    <LogOut size={19} strokeWidth={1.7} />

                    <span className={cn("text-sm font-medium", collapsed && "md:hidden")}>
            Logout
          </span>
                </button>
            </div>
        </aside>
    );
}