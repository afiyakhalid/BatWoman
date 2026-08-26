import {
    useQuery,
} from "@tanstack/react-query";

import {
    getProducts,
} from "@/services/adminProduct.service";

import {
    AdminProduct,
} from "@/types/admin-product";

export function useAdminProducts() {

    return useQuery<AdminProduct[]>({

        queryKey: ["products"],

        queryFn: getProducts,

    });

}