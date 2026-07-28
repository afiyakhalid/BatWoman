"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrder } from "@/services/adminOrder.service";

export function useOrder(orderId: string) {

    return useQuery({

        queryKey: ["admin-order", orderId],

        queryFn: () => getOrder(orderId),

        enabled: !!orderId,

    });

}