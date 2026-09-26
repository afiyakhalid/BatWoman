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

    const accessToken =
        useAuthStore(
            (state) => state.accessToken
        );

    const {

        data: user,

        isLoading,

    } = useCurrentUser();

    /*
     * Authentication guard.
     *
     * This is intentionally based on the auth store,
     * not only on the cached /me response.
     *
     * Therefore, if the user logs out and then presses
     * the browser Back button, the admin page cannot
     * remain accessible.
     */
    useEffect(() => {

        if (!accessToken) {

            router.replace("/");

        }

    }, [accessToken, router]);

    /*
     * Wait for the authenticated user's role only when
     * an access token actually exists.
     */
    if (!accessToken) {

        return null;

    }

    if (isLoading) {

        return null;

    }

    /*
     * Authentication exists, but this user is not an
     * administrator.
     */
    if (user?.role !== "ADMIN") {

        return null;

    }

    return (

        <AdminLayout>

            {children}

        </AdminLayout>

    );

}