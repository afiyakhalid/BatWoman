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
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const logoutStore = useAuthStore((state) => state.logout);

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
      <main className="min-h-screen bg-[#faf8f5] py-20 flex items-center justify-center">
        <p className="font-[var(--font-playfair)] italic text-xl text-neutral-500">
          Loading client account...
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#faf8f5] py-20 flex items-center justify-center text-center">
        <div className="bg-white border border-[#e7e1d8] p-8 max-w-md shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-red-600">
            Failed to load profile record
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] py-12 sm:py-20 px-4 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl">
        {/* EDITORIAL HEADER */}
        <div className="mb-10 pb-6 border-b border-[#e7e1d8]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium mb-1">
            Client Directory
          </p>
          <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900">
            My Account
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 tracking-wide">
            Manage your personal profile, delivery addresses, and order history.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
          <ProfileCard user={data} />
          <AccountMenu onLogout={handleLogout} />
        </div>
      </section>
    </main>
  );
}