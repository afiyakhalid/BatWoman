"use client";

import { useMutation } from "@tanstack/react-query";
import {
    createPayment,
    verifyPayment,
    handlePaymentFailure,
} from "@/services/payment.service";

export function useCreatePayment() {

    return useMutation({

        mutationFn: createPayment,

    });

}

export function useVerifyPayment() {

    return useMutation({

        mutationFn: verifyPayment,

    });

}

export function useHandlePaymentFailure() {

    return useMutation({

        mutationFn: handlePaymentFailure,

    });

}