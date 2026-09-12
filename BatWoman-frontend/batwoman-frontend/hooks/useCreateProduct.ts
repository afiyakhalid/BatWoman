"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createProduct,
    CreateProductRequest,
    ProductResponse,
} from "@/services/adminProduct.service";

export function useCreateProduct() {

    const queryClient =
        useQueryClient();

    return useMutation<
        ProductResponse,
        Error,
        CreateProductRequest
    >({

        mutationFn: (
            request: CreateProductRequest
        ) => createProduct(request),

        onSuccess: async () => {

            await queryClient.invalidateQueries({
                queryKey: ["admin-products"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["products"],
            });

        },

    });

}