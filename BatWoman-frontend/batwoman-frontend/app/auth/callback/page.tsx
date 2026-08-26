"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";

export default function OAuthCallbackPage() {

    const router = useRouter();

    const searchParams = useSearchParams();

    const { setTokens } = useAuthStore();

    useEffect(() => {

        const accessToken =
            searchParams.get("accessToken");

        const refreshToken =
            searchParams.get("refreshToken");

        const role =
            searchParams.get("role");

        if (
            !accessToken ||
            !refreshToken ||
            !role
        ) {

            router.replace("/customer/login");

            return;

        }

        /*
         * Store tokens exactly like
         * the normal login flow.
         */

        setTokens(
            accessToken,
            refreshToken
        );

        /*
         * Redirect based on role.
         */

        if (role === "ADMIN") {

            router.replace("/admin");

            return;

        }

        router.replace("/");

    }, [
        router,
        searchParams,
        setTokens,
    ]);

    return (

        <main className="flex min-h-screen items-center justify-center bg-white">

            <div className="text-center">

                <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />

                <h2 className="text-xl font-medium">

                    Signing you in...

                </h2>

                <p className="mt-2 text-sm text-neutral-500">

                    Completing your Google sign in...

                </p>

            </div>

        </main>

    );

}