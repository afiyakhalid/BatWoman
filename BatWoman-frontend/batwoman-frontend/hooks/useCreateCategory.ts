"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    createCategory,
    CreateCategoryRequest,
} from "@/services/adminCategory.service";

export function useCreateCategory() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (request: CreateCategoryRequest) =>
            createCategory(request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["categories"],

            });

        },

    });

}