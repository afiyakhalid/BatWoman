"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clearCart } from "@/services/cart.service";

export function useClearCart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: clearCart,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["cart"],

            });

        },

    });

}