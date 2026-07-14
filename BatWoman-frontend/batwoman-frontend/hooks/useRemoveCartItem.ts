"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeCartItem } from "@/services/cart.service";

export function useRemoveCartItem() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: removeCartItem,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["cart"],

            });

        },

    });

}