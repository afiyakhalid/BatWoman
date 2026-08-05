"use client";

import {

    useMutation,

    useQuery,

    useQueryClient,

} from "@tanstack/react-query";

import {

    getAdminReviews,

    deleteAdminReview,

} from "@/services/adminReview.service";

import { toast } from "sonner";

const REVIEW_QUERY = ["admin-reviews"];

export function useAdminReviews() {

    return useQuery({

        queryKey: REVIEW_QUERY,

        queryFn: getAdminReviews,

    });

}

export function useDeleteReview() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteAdminReview,

        onSuccess: () => {

            toast.success(

                "Review deleted."

            );

            queryClient.invalidateQueries({

                queryKey: REVIEW_QUERY,

            });

        },

        onError: () => {

            toast.error(

                "Unable to delete review."

            );

        },

    });

}