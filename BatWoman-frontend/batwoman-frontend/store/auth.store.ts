"use client";

import { create } from "zustand";

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;

    setTokens: (
        accessToken: string,
        refreshToken: string
    ) => void;

    logout: () => void;

    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    accessToken:
        typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null,

    refreshToken:
        typeof window !== "undefined"
            ? localStorage.getItem("refreshToken")
            : null,

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