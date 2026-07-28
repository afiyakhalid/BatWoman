"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    restockInventory,
    RestockInventoryRequest,
} from "@/services/adminInventory.service";

export function useRestockInventory() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (
            request: RestockInventoryRequest
        ) => restockInventory(request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["admin-inventory"],

            });

            toast.success(
                "Inventory restocked successfully."
            );

        },

        onError: () => {

            toast.error(
                "Failed to restock inventory."
            );

        },

    });

}