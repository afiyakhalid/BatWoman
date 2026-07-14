"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartItem } from "@/services/cart.service";

export function useUpdateCart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({

            cartItemId,

            quantity,

        }: {

            cartItemId: string;

            quantity: number;

        }) =>

            updateCartItem(

                cartItemId,

                quantity

            ),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["cart"],

            });

        },

    });

}