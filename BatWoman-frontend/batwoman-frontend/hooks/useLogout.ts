"use client";

import { useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth.store";

export function useLogout() {

    const queryClient = useQueryClient();

    const logout =
        useAuthStore(
            (state) => state.logout
        );

    return () => {

        /*
         * Clear authentication first.
         */
        logout();

        /*
         * Remove all user-specific React Query data.
         *
         * This prevents data belonging to the previous
         * account from remaining in memory after logout.
         */
        queryClient.removeQueries({
            queryKey: ["cart"],
        });

        queryClient.removeQueries({
            queryKey: ["current-user"],
        });

        /*
         * Replace the current history entry instead of
         * creating another entry.
         */
        window.location.replace("/");

    };

}