"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    checkout,
    CheckoutRequest,
} from "@/services/order.service";

export function useCheckout() {

    return useMutation({

        mutationFn: (
            request: CheckoutRequest
        ) => checkout(request),

        onSuccess: () => {

            toast.success(
                "Order created successfully."
            );

        },

        onError: () => {

            toast.error(
                "Unable to create order."
            );

        },

    });

}