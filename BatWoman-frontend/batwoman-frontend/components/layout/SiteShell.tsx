"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import AuthInitializer from "@/providers/AuthInitializer";
import Navbar from "@/components/layout/Navbar";
import { AuthModal } from "@/components/auth";
import { Toaster } from "sonner";

export default function SiteShell({
                                      children,
                                  }: {
    children: ReactNode;
}) {
    const pathname = usePathname();

    const isAdminRoute =
        pathname === "/admin" ||
        pathname.startsWith("/admin/");

    return (
        <>
            <AuthInitializer />

            {!isAdminRoute && <Navbar />}

            <div className={isAdminRoute ? "" : "pt-20"}>
                {children}
            </div>

            {!isAdminRoute && <AuthModal />}

            <Toaster richColors />
        </>
    );
}