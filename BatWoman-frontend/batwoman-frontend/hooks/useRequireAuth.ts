"use client";

import { useAuthStore } from "@/store/auth.store";
import { useAuthModal } from "@/hooks/useAuthModal";

export function useRequireAuth() {

    const isAuthenticated =
        useAuthStore((state) => state.isAuthenticated());

    const { openLogin } = useAuthModal();

    function requireAuth(action: () => void) {

        if (!isAuthenticated) {

            openLogin();

            return;
        }

        action();
    }

    return requireAuth;
}