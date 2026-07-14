"use client";

import { useAuthModalStore } from "@/store/authModal.store";

export function useAuthModal() {
    return useAuthModalStore();
}