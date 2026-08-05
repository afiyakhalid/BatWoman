"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    ContactRequest,
    sendContactMessage,
} from "@/services/contact.service";

export function useContact() {

    const mutation = useMutation({

        mutationFn: (request: ContactRequest) =>
            sendContactMessage(request),

        onSuccess: () => {

            toast.success(
                "Your message has been sent successfully."
            );

        },

        onError: (error: unknown) => {

            let message =
                "Unable to send your message. Please try again later.";

            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {

                const response = (
                    error as {
                        response?: {
                            data?: {
                                message?: string;
                            };
                        };
                    }
                ).response;

                if (response?.data?.message) {

                    message = response.data.message;

                }

            }

            toast.error(message);

        },

    });

    return {

        sendMessage: mutation.mutate,

        sendMessageAsync: mutation.mutateAsync,

        isPending: mutation.isPending,

        isSuccess: mutation.isSuccess,

        isError: mutation.isError,

        error: mutation.error,

        reset: mutation.reset,

    };

}