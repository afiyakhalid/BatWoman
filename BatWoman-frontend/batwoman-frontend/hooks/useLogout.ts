"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";

export function useLogout() {

    const router = useRouter();

    const { logout } = useAuthStore();

    return () => {

        logout();

        router.push("/login");

    };

}