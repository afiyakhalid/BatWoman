"use client";

import { useMutation } from "@tanstack/react-query";

import { register } from "@/services/auth.service";

import { useAuthModal } from "@/hooks/useAuthModal";

export function useRegister() {
    const { openLogin } = useAuthModal();

    return useMutation({
        mutationFn: register,

        onSuccess: () => {
            openLogin();
        },
    });
}