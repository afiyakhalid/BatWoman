"use client";

import { useQuery } from "@tanstack/react-query";

import {

    DashboardResponse,

    getDashboard,

} from "@/services/adminDashboard.service";

export function useDashboard() {

    return useQuery<DashboardResponse>({

        queryKey: ["admin-dashboard"],

        queryFn: getDashboard,

        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,

    });

}