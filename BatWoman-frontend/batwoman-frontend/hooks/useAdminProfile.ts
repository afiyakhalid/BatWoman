"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminProfile } from "@/services/adminSettings.service";

export function useAdminProfile() {

    return useQuery({

        queryKey: ["admin-profile"],

        queryFn: getAdminProfile,

    });

}