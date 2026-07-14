"use client";

import { useMutation } from "@tanstack/react-query";

import { login } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

import { useAuthModal } from "@/hooks/useAuthModal";

export function useLogin() {
    const { setTokens } = useAuthStore();

    const { close } = useAuthModal();

    return useMutation({
        mutationFn: login,

        onSuccess: (response) => {
            setTokens(
                response.accessToken,
                response.refreshToken
            );

            close();
        },
    });
}