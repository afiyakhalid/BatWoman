"use client";

import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "@/services/adminAnalytics.service";

export function useAnalytics() {

    return useQuery({

        queryKey: ["admin-analytics"],

        queryFn: getAnalytics,

        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,

    });

}