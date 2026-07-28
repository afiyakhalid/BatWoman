"use client";

import { useQuery } from "@tanstack/react-query";

import { getCustomer } from "@/services/adminCustomer.service";

export function useAdminCustomer(customerId: string) {

    return useQuery({

        queryKey: ["admin-customer", customerId],

        queryFn: () => getCustomer(customerId),

        enabled: !!customerId,

    });

}