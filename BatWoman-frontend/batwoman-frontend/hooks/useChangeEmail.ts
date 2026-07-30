"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {

    changeEmail,

    ChangeEmailRequest,

} from "@/services/adminSettings.service";

import { toast } from "sonner";

export function useChangeEmail() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (

            request: ChangeEmailRequest

        ) => changeEmail(request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["admin-profile"],

            });

            toast.success("Email updated successfully.");

        },

        onError: () => {

            toast.error("Failed to update email.");

        },

    });

}