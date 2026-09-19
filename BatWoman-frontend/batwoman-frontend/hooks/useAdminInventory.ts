"use client";

import { useQuery } from "@tanstack/react-query";

import {
    getInventory,
    GetInventoryParams,
} from "@/services/adminInventory.service";

export function useAdminInventory(
    params: GetInventoryParams
) {

    return useQuery({

        queryKey: [
            "admin-inventory",
            params,
        ],

        queryFn: () =>
            getInventory(params),

    });

}