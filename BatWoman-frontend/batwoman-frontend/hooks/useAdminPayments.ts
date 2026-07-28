"use client";

import { useQuery } from "@tanstack/react-query";

import { getPayments } from "@/services/adminPayment.service";

export function useAdminPayments() {

    return useQuery({

        queryKey: ["admin-payments"],

        queryFn: getPayments,

    });

}