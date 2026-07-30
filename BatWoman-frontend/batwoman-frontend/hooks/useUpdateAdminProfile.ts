"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {

    updateAdminProfile,

    UpdateAdminProfileRequest,

} from "@/services/adminSettings.service";

import { toast } from "sonner";

export function useUpdateAdminProfile() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (

            request: UpdateAdminProfileRequest

        ) => updateAdminProfile(request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["admin-profile"],

            });

            toast.success("Profile updated successfully.");

        },

        onError: () => {

            toast.error("Failed to update profile.");

        },

    });

}