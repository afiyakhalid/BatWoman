// "use client";
//
// import {
//     useMutation,
//     useQueryClient,
// } from "@tanstack/react-query";
//
// import {
//     updateProduct,
//     ProductResponse,
// } from "@/services/adminProduct.service";
//
// import {
//     AdminProductFormData,
// } from "@/types/admin-product";
//
// interface UpdateProductVariables {
//     id: string;
//     request: AdminProductFormData;
// }
//
// export function useUpdateProduct() {
//     const queryClient = useQueryClient();
//
//     return useMutation<
//         ProductResponse,
//         Error,
//         UpdateProductVariables
//     >({
//         mutationFn: ({
//                          id,
//                          request,
//                      }) =>
//             updateProduct(
//                 id,
//                 request
//             ),
//
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["products"],
//             });
//             queryClient.invalidateQueries({
//                 queryKey: ["product"],
//             });
//         },
//     });
// }

"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    updateProduct,
    ProductResponse,
} from "@/services/adminProduct.service";

import {
    AdminProductFormData,
} from "@/types/admin-product";

interface UpdateProductVariables {
    id: string;
    request: AdminProductFormData;
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation<
        ProductResponse,
        Error,
        UpdateProductVariables
    >({
        mutationFn: ({ id, request }) =>
            updateProduct(id, request),

        onSuccess: async (_data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["products"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["product"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["product", variables.id],
                }),
            ]);
        },
    });
}
