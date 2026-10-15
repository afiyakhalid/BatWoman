
"use client";

import { create } from "zustand";

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isHydrated: boolean;

    hydrate: () => void;

    setTokens: (
        accessToken: string,
        refreshToken: string
    ) => void;

    logout: () => void;

    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    accessToken: null,
    refreshToken: null,
    isHydrated: false,

    hydrate: () => {
        if (typeof window === "undefined") {
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        set({
            accessToken,
            refreshToken,
            isHydrated: true,
        });
    },

    setTokens: (accessToken, refreshToken) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        }

        set({
            accessToken,
            refreshToken,
            isHydrated: true,
        });
    },

    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }

        set({
            accessToken: null,
            refreshToken: null,
            isHydrated: true,
        });
    },

    isAuthenticated: () => {
        return get().accessToken !== null;
    },
}));
