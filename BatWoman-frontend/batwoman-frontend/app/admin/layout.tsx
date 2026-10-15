
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminLayout from "@/components/admin/AdminLayout";

import { useAuthStore } from "@/store/auth.store";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const accessToken = useAuthStore(
        (state) => state.accessToken
    );

    const isHydrated = useAuthStore(
        (state) => state.isHydrated
    );

    const {
        data: user,
        isLoading,
    } = useCurrentUser();

    // Wait for persisted authentication before redirecting.
    useEffect(() => {
        if (isHydrated && !accessToken) {
            router.replace("/");
        }
    }, [isHydrated, accessToken, router]);

    // Redirect authenticated users who are not administrators.
    useEffect(() => {
        if (
            isHydrated &&
            accessToken &&
            !isLoading &&
            user &&
            user.role !== "ADMIN"
        ) {
            router.replace("/");
        }
    }, [
        isHydrated,
        accessToken,
        isLoading,
        user,
        router,
    ]);

    // Do not render protected content until authentication
    // and the current user's role have been checked.
    if (!isHydrated || !accessToken || isLoading) {
        return null;
    }

    if (!user) {
        return null;
    }

    if (user.role !== "ADMIN") {
        return null;
    }

    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
}
