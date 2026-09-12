"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { addToCart } from "@/services/cart.service";

interface AddToCartVariables {
    variantId: string;
    quantity: number;
}

export function useAddToCart() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
                         variantId,
                         quantity,
                     }: AddToCartVariables) =>
            addToCart(
                variantId,
                quantity
            ),

        onSuccess: async () => {

            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

        },

    });

}