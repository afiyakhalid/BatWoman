"use client";

import {

    useMutation,

    useQuery,

    useQueryClient,

} from "@tanstack/react-query";

import {

    checkout,

    getMyOrders,

    getOrder,

    cancelOrder,

    CheckoutRequest,

} from "@/services/order.service";

export function useCheckout() {

    return useMutation({

        mutationFn: (request: CheckoutRequest) =>

            checkout(request),

    });

}

export function useMyOrders() {

    return useQuery({

        queryKey: ["orders"],

        queryFn: getMyOrders,

    });

}

export function useOrder(orderId?: string) {

    return useQuery({

        queryKey: ["orders", orderId],

        queryFn: () => getOrder(orderId!),

        enabled: !!orderId,

    });

}

export function useCancelOrder() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: cancelOrder,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["orders"],

            });

        },

    });

}