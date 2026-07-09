"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReview } from "@/services/review.service";

export function useCreateReview(productId: string) {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createReview,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["reviews", productId],

      });

    },

  });

}