import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;

    setTokens: (
        accessToken: string,
        refreshToken: string
    ) => void;

    logout: () => void;

    initialize: () => void;

    isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>((set, get) => ({

    accessToken: null,

    refreshToken: null,

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

    initialize: () => {

        const accessToken =
            localStorage.getItem("accessToken");

        const refreshToken =
            localStorage.getItem("refreshToken");

        set({
            accessToken,
            refreshToken,
        });

    },

    isAuthenticated: () => {

        return get().accessToken !== null;

    },

}));