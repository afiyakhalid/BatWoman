"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    deleteProduct,
} from "@/services/adminProduct.service";

export function useDeleteProduct() {

    const queryClient =
        useQueryClient();

    return useMutation<
        void,
        Error,
        string
    >({

        mutationFn: deleteProduct,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

        },

    });
}