"use client";

import {

    useQuery,

    useMutation,

    useQueryClient,

} from "@tanstack/react-query";

import {

    getAddresses,

    createAddress,

    updateAddress,

    deleteAddress,

    CreateAddressRequest,

    UpdateAddressRequest,

} from "@/services/address.service";

import { toast } from "sonner";

const ADDRESS_QUERY_KEY = ["addresses"];

export function useAddresses() {

    return useQuery({

        queryKey: ADDRESS_QUERY_KEY,

        queryFn: getAddresses,

    });
}

export function useCreateAddress() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (

            request: CreateAddressRequest

        ) => createAddress(request),

        onSuccess: () => {

            toast.success(
                "Address added successfully."
            );

            queryClient.invalidateQueries({

                queryKey: ADDRESS_QUERY_KEY,

            });

        },

        onError: () => {

            toast.error(
                "Failed to create address."
            );

        },

    });
}

export function useUpdateAddress() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (

            data: {

                addressId: string;

                request: UpdateAddressRequest;

            }

        ) =>

            updateAddress(

                data.addressId,

                data.request

            ),

        onSuccess: () => {

            toast.success(
                "Address updated."
            );

            queryClient.invalidateQueries({

                queryKey: ADDRESS_QUERY_KEY,

            });

        },

        onError: () => {

            toast.error(
                "Unable to update address."
            );

        },

    });
}

export function useDeleteAddress() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (

            addressId: string

        ) => deleteAddress(addressId),

        onSuccess: () => {

            toast.success(
                "Address deleted."
            );

            queryClient.invalidateQueries({

                queryKey: ADDRESS_QUERY_KEY,

            });

        },

        onError: () => {

            toast.error(
                "Failed to delete address."
            );

        },

    });
}