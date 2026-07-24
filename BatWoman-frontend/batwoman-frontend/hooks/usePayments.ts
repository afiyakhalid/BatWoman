"use client";

import { useMutation } from "@tanstack/react-query";
import {
    createPayment,
    verifyPayment,
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