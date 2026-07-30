"use client";

import { useMutation } from "@tanstack/react-query";

import {

    changePassword,

    ChangePasswordRequest,

} from "@/services/adminSettings.service";

import { toast } from "sonner";

export function useChangePassword() {

    return useMutation({

        mutationFn: (

            request: ChangePasswordRequest

        ) => changePassword(request),

        onSuccess: () => {

            toast.success("Password updated successfully.");

        },

        onError: () => {

            toast.error("Failed to update password.");

        },

    });

}