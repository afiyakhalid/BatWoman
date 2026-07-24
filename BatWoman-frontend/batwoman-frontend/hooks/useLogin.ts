"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { login } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useAuthModal } from "@/hooks/useAuthModal";

export function useLogin() {

    const router = useRouter();   // <-- THIS LINE IS REQUIRED

    const { setTokens } = useAuthStore();
    const { close } = useAuthModal();

    return useMutation({

        mutationFn: login,

        // onSuccess: (response) => {

        //     setTokens(
        //         response.accessToken,
        //         response.refreshToken
        //     );

        //     close();

        //     if (response.role === "ADMIN") {

        //         router.replace("/admin");

        //     } else {

        //         router.replace("/");

        //     }

        // },
        onSuccess: (response) => {

    console.log("LOGIN SUCCESS");
    console.log(response);

    setTokens(
        response.accessToken,
        response.refreshToken
    );

    close();

    if (response.role === "ADMIN") {

        console.log("GOING TO ADMIN");

        router.replace("/admin");

        return;
    }

    console.log("GOING TO HOME");

    router.replace("/");

}

    });

}