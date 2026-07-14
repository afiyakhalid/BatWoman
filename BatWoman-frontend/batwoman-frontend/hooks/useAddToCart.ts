"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addToCart } from "@/services/cart.service";

export function useAddToCart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            productId,
            quantity,
        }: {
            productId: string;
            quantity: number;
        }) =>
            addToCart(
                productId,
                quantity
            ),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["cart"],

            });

        },

    });

}