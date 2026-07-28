"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrders } from "@/services/adminOrder.service";

export function useAdminOrders() {

    return useQuery({

        queryKey: ["admin-orders"],

        queryFn: getOrders,

    });

}