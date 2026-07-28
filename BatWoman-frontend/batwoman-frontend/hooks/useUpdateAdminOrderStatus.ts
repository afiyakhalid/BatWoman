"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateOrderStatus } from "@/services/adminOrder.service";

export function useUpdateAdminOrderStatus() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            orderId,
            status,
        }: {
            orderId: string;
            status: string;
        }) =>
            updateOrderStatus(orderId, { status }),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["admin-orders"],
            });

        },

    });

}