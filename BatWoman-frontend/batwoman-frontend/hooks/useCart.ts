"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from "@/services/cart.service";

export function useCart() {

    const queryClient = useQueryClient();

    const cartQuery = useQuery({

        queryKey: ["cart"],

        queryFn: getCart,

    });

    const addMutation = useMutation({

        mutationFn: ({
            productId,
            quantity,
        }: {
            productId: string;
            quantity: number;
        }) => addToCart(productId, quantity),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },

    });

    const updateMutation = useMutation({

        mutationFn: ({
            cartItemId,
            quantity,
        }: {
            cartItemId: string;
            quantity: number;
        }) => updateCartItem(cartItemId, quantity),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },

    });

    const removeMutation = useMutation({

        mutationFn: removeCartItem,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },

    });

    const clearMutation = useMutation({

        mutationFn: clearCart,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },

    });

    return {

        ...cartQuery,

        addToCart: addMutation.mutate,

        updateCartItem: updateMutation.mutate,

        removeCartItem: removeMutation.mutate,

        clearCart: clearMutation.mutate,

    };

}