"use client";

import { useRouter } from "next/navigation";

import { logout as logoutService } from "@/services/auth.service";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/store/auth.store";

import ProfileCard from "@/components/profile/ProfileCard";
import AccountMenu from "@/components/profile/AccountMenu";

export default function ProfilePage() {

    const router = useRouter();

    const { data, isLoading } = useCurrentUser();

    const refreshToken = useAuthStore(
        (state) => state.refreshToken
    );

    const logoutStore = useAuthStore(
        (state) => state.logout
    );

    async function handleLogout() {

        try {

            if (refreshToken) {

                await logoutService(refreshToken);

            }

        } finally {

            logoutStore();

            router.push("/");

        }

    }

    if (isLoading) {

        return (

            <div className="pt-40 text-center">

                Loading...

            </div>

        );

    }

    if (!data) {

        return (

            <div className="pt-40 text-center">

                Failed to load profile.

            </div>

        );

    }

    return (

        <section className="mx-auto max-w-7xl px-6 py-36">

            <h1 className="mb-12 font-[var(--font-playfair)] text-5xl">

                My Account

            </h1>

            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

                <ProfileCard
                    user={data}
                />

                <AccountMenu
                    onLogout={handleLogout}
                />

            </div>

        </section>

    );

}