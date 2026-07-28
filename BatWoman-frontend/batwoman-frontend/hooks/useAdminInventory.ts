"use client";

import { useQuery } from "@tanstack/react-query";

import { getInventory } from "@/services/adminInventory.service";

export function useAdminInventory() {

    return useQuery({

        queryKey: ["admin-inventory"],

        queryFn: getInventory,

    });

}