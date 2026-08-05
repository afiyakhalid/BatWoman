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

const ORDER_QUERY = ["orders"];

export function useCheckout() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (request: CheckoutRequest) =>

            checkout(request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ORDER_QUERY,

            });

        },

    });

}

export function useOrders() {

    return useQuery({

        queryKey: ORDER_QUERY,

        queryFn: getMyOrders,

    });

}

export function useOrder(

    orderId?: string

) {

    return useQuery({

        queryKey: [...ORDER_QUERY, orderId],

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

                queryKey: ORDER_QUERY,

            });

        },

    });

}