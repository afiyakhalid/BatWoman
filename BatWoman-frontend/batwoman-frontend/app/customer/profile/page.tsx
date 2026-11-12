
"use client";

import { useRouter } from "next/navigation";
import { logout as logoutService } from "@/services/auth.service";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuthStore } from "@/store/auth.store";
import { useAuthModal } from "@/hooks/useAuthModal";

import ProfileCard from "@/components/profile/ProfileCard";
import AccountMenu from "@/components/profile/AccountMenu";

export default function ProfilePage() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useCurrentUser();

  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const logoutStore = useAuthStore((state) => state.logout);

  const { openLogin } = useAuthModal();

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

  // Wait until authentication state has been restored.
  if (!isHydrated) {
    return (
        <main className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
          <p className="font-[var(--font-playfair)] italic text-xl text-neutral-500">
            Loading your account...
          </p>
        </main>
    );
  }

  // Guest customer state.
  if (!accessToken) {
    return (
        <main className="min-h-screen bg-[#faf8f5] px-4 py-24 flex items-center justify-center">
          <div className="w-full max-w-md border border-[#e7e1d8] bg-white p-8 sm:p-12 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8C6D4F] font-medium">
              Client Account
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-3xl sm:text-4xl text-neutral-900">
              Welcome to Zubayda
            </h1>

            <p className="mt-4 text-sm leading-7 text-neutral-500">
              Sign in to access your personal profile, manage delivery
              addresses and view your order history.
            </p>

            <button
                type="button"
                onClick={openLogin}
                className="mt-8 w-full bg-black py-4 text-xs uppercase tracking-[0.22em] font-medium text-white transition hover:bg-neutral-800"
            >
              Login / Register
            </button>

            <button
                type="button"
                onClick={() => router.push("/customer/products")}
                className="mt-5 text-xs uppercase tracking-[0.16em] text-neutral-500 underline underline-offset-4 hover:text-black"
            >
              Continue Shopping
            </button>
          </div>
        </main>
    );
  }

  // Authenticated customer loading state.
  if (isLoading) {
    return (
        <main className="min-h-screen bg-[#faf8f5] py-20 flex items-center justify-center">
          <p className="font-[var(--font-playfair)] italic text-xl text-neutral-500">
            Loading client account...
          </p>
        </main>
    );
  }

  // Actual API failure, not a guest state.
  if (isError || !data) {
    return (
        <main className="min-h-screen bg-[#faf8f5] px-4 py-20 flex items-center justify-center">
          <div className="w-full max-w-md border border-[#e7e1d8] bg-white p-8 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-red-600">
              Unable to load your profile
            </p>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              We couldn't retrieve your account information. Please
              try again.
            </p>

            <button
                type="button"
                onClick={() => refetch()}
                className="mt-7 w-full bg-black py-4 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-neutral-800"
            >
              Try Again
            </button>
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
