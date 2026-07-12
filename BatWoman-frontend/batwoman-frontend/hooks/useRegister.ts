"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { register } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useRegister() {

    const router = useRouter();

    const { setTokens } = useAuthStore();

    return useMutation({

        mutationFn: register,

        onSuccess: (response) => {

            setTokens(
                response.accessToken,
                response.refreshToken
            );

            router.push("/");
        },

    });

}