"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useCurrentUser() {

    const accessToken =
        useAuthStore(
            (state) => state.accessToken
        );

    return useQuery({

        queryKey: ["current-user"],

        queryFn: getCurrentUser,

        enabled: !!accessToken,

    });

}