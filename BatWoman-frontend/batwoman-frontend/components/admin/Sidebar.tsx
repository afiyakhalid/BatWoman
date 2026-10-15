
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
    Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/useLogout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onClose: () => void;
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
                                    onClose,
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

    function handleLogout() {
        onClose();
        logout();
    }

    return (
        <aside
            aria-label="Admin navigation"
            className={cn(
                "fixed inset-y-0 left-0 z-50 flex h-dvh flex-col",
                "border-r border-[#E5D9C9] bg-[#F7F1E8] text-[#29241F]",
                "transition-[width,transform] duration-300 ease-in-out",
                "w-72",
                collapsed ? "md:w-24" : "md:w-72",
                mobileOpen
                    ? "translate-x-0 shadow-2xl"
                    : "-translate-x-full md:translate-x-0"
            )}
        >
            {/* Brand */}
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#E5D9C9] px-5 sm:h-24 sm:px-6">
                <div
                    className={cn(
                        "min-w-0",
                        collapsed && "md:hidden"
                    )}
                >
                    <h2 className="font-[var(--font-playfair)] text-2xl tracking-[0.12em] text-[#8C6D48]">
                        ZUBAYDA
                    </h2>
                    <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-[#8B8174]">
                        By A3 · Administration
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close navigation"
                    className="rounded-full p-2 text-[#6D6256] transition hover:bg-[#EDE3D6] md:hidden"
                >
                    <X size={21} />
                </button>

                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="hidden rounded-full border border-[#E5D9C9] p-2 text-[#78664F] transition hover:bg-[#EDE3D6] md:inline-flex"
                >
                    {collapsed ? (
                        <ChevronRight size={18} />
                    ) : (
                        <ChevronLeft size={18} />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-4 sm:py-7">
                <p
                    className={cn(
                        "mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A09484]",
                        collapsed && "md:hidden"
                    )}
                >
                    Store Management
                </p>

                <ul className="space-y-1.5">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        const active =
                            item.href === "/admin"
                                ? pathname === "/admin"
                                : pathname === item.href ||
                                pathname.startsWith(`${item.href}/`);

                        return (
                            <li key={item.title}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    title={collapsed ? item.title : undefined}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "group flex min-h-12 items-center rounded-xl transition-all duration-200",
                                        collapsed
                                            ? "justify-center px-3 py-3 md:px-0"
                                            : "gap-3.5 px-4 py-3",
                                        active
                                            ? "border border-[#DCC9AD] bg-[#EDE2D2] text-[#654A2F] shadow-sm"
                                            : "border border-transparent text-[#6D6256] hover:border-[#E8DDCF] hover:bg-[#F0E7DC] hover:text-[#34291E]"
                                    )}
                                >
                                    <Icon
                                        size={20}
                                        strokeWidth={active ? 2 : 1.7}
                                        className="shrink-0"
                                    />

                                    <span
                                        className={cn(
                                            "min-w-0 flex-1 text-sm font-medium",
                                            collapsed && "md:hidden"
                                        )}
                                    >
                                        {item.title}
                                    </span>

                                    {item.badge !== undefined && (
                                        <span
                                            className={cn(
                                                "rounded-full bg-[#8C6D48] px-2 py-0.5 text-[10px] font-semibold text-white",
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
            <div className="shrink-0 border-t border-[#E5D9C9] p-3 sm:p-4">
                <div
                    className={cn(
                        "mb-3 flex items-center gap-3 rounded-xl border border-[#E8DDCF] bg-[#F0E7DC] p-3",
                        collapsed && "md:justify-center md:px-2"
                    )}
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8C6D48] font-[var(--font-playfair)] text-lg text-white">
                        {avatarInitial}
                    </div>

                    <div
                        className={cn(
                            "min-w-0 flex-1",
                            collapsed && "md:hidden"
                        )}
                    >
                        <p className="truncate text-sm font-semibold text-[#34291E]">
                            {fullName}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] uppercase tracking-wider text-[#8B8174]">
                            {roleName.replaceAll("_", " ")}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        onClose();
                        router.push("/");
                    }}
                    title={collapsed ? "View Store" : undefined}
                    className={cn(
                        "mb-1 flex min-h-11 w-full items-center rounded-xl text-[#6D6256] transition hover:bg-[#EDE3D6] hover:text-[#34291E]",
                        collapsed
                            ? "justify-center px-3"
                            : "gap-3.5 px-4"
                    )}
                >
                    <Store size={20} strokeWidth={1.7} />
                    <span className={cn("text-sm font-medium", collapsed && "md:hidden")}>
                        View Store
                    </span>
                </button>

                <button
                    type="button"
                    onClick={handleLogout}
                    title={collapsed ? "Logout" : undefined}
                    className={cn(
                        "flex min-h-11 w-full items-center rounded-xl text-[#9B5148] transition hover:bg-[#F1E0DB]",
                        collapsed
                            ? "justify-center px-3"
                            : "gap-3.5 px-4"
                    )}
                >
                    <LogOut size={20} strokeWidth={1.7} />
                    <span className={cn("text-sm font-medium", collapsed && "md:hidden")}>
                        Logout
                    </span>
                </button>

                <div
                    className={cn(
                        "mt-3 flex items-center gap-2 px-4 text-[10px] uppercase tracking-[0.18em] text-[#A09484]",
                        collapsed && "md:hidden"
                    )}
                >
                    <Sparkles size={12} />
                    <span>Zubayda Administration</span>
                </div>
            </div>
        </aside>
    );
}
