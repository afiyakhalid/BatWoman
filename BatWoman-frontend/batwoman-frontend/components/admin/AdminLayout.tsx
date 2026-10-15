"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({
                                        children,
                                    }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    function toggleSidebar() {
        setCollapsed((previous) => !previous);
    }

    function closeMobileMenu() {
        setMobileMenuOpen(false);
    }

    return (
        <div className="min-h-screen overflow-x-clip bg-[#F7F3ED] text-[#29241F]">
            {/* Admin sidebar */}
            <Sidebar
                collapsed={collapsed}
                onToggle={toggleSidebar}
                mobileOpen={mobileMenuOpen}
                onMobileClose={closeMobileMenu}
            />

            {/* Mobile backdrop */}
            {mobileMenuOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={closeMobileMenu}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
                />
            )}

            {/* Main application area */}
            <div
                className={`
          min-h-screen min-w-0
          transition-[margin] duration-300 ease-in-out
          ${
                    collapsed
                        ? "md:ml-20"
                        : "md:ml-[272px]"
                }
        `}
            >
                <TopNavbar
                    onMenuClick={() =>
                        setMobileMenuOpen((previous) => !previous)
                    }
                />

                <main className="min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
                    <div className="mx-auto w-full max-w-[1600px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}