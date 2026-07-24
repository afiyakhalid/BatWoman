"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    updateCategory,
    UpdateCategoryRequest,
} from "@/services/adminCategory.service";

interface UpdateCategoryInput {

    id: string;

    request: UpdateCategoryRequest;

}

export function useUpdateCategory() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({ id, request }: UpdateCategoryInput) =>
            updateCategory(id, request),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["categories"],

            });

        },

    });

}