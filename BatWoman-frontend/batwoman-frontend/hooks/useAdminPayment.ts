"use client";

import { useQuery } from "@tanstack/react-query";

import { getPayment } from "@/services/adminPayment.service";

export function useAdminPayment(paymentId: string) {

    return useQuery({

        queryKey: ["admin-payment", paymentId],

        queryFn: () => getPayment(paymentId),

        enabled: !!paymentId,

    });

}