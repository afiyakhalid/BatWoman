"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    updateProduct,
    ProductResponse,
} from "@/services/adminProduct.service";

import {
    AdminProductFormData,
} from "@/types/admin-product";

interface UpdateProductVariables {

    id: string;

    request: AdminProductFormData;

}

export function useUpdateProduct() {

    const queryClient =
        useQueryClient();

    return useMutation<
        ProductResponse,
        Error,
        UpdateProductVariables
    >({

        mutationFn: ({
                         id,
                         request,
                     }) =>
            updateProduct(
                id,
                request
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

        },

    });
}