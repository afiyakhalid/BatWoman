"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { login } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useLogin() {

    const router = useRouter();

    const { setTokens } = useAuthStore();

    return useMutation({

        mutationFn: login,

        onSuccess: (response) => {

            setTokens(
                response.accessToken,
                response.refreshToken
            );

            router.push("/");
        },

    });

}