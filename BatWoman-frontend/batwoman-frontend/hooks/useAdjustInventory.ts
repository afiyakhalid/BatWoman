"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    adjustInventory,
    AdjustInventoryRequest,
} from "@/services/adminInventory.service";

export function useAdjustInventory() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: (
            request: AdjustInventoryRequest
        ) =>
            adjustInventory(request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: [
                    "admin-inventory",
                ],

            });

            toast.success(
                "Inventory updated successfully."
            );

        },

        onError: () => {

            toast.error(
                "Failed to update inventory."
            );

        },

    });

}