"use client";

import { create } from "zustand";

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;

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

    hydrate: () => {
        if (typeof window === "undefined") {
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        set({
            accessToken,
            refreshToken,
        });
    },

    setTokens: (accessToken, refreshToken) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        set({
            accessToken,
            refreshToken,
        });
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        set({
            accessToken: null,
            refreshToken: null,
        });
    },

    isAuthenticated: () => {
        return get().accessToken != null;
    },
}));