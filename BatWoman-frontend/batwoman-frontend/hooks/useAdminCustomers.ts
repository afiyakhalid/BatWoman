"use client";

import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "@/services/adminCustomer.service";

export function useAdminCustomers() {

    return useQuery({

        queryKey: ["admin-customers"],

        queryFn: getCustomers,

    });

}