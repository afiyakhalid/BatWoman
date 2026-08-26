import api from "@/lib/axios";

import {
    AdminProduct,
    AdminProductFormData,
} from "@/types/admin-product";

export interface ProductResponse {
    id: string;
    name: string;
    slug: string;
}

export interface ProductMedia {
    id: string;
    mediaType: "IMAGE" | "VIDEO" | string;
    mediaUrl: string;
    objectKey?: string;
    altText?: string | null;
    primaryMedia: boolean;
    displayOrder: number;
    createdAt?: string;
}

export interface ProductDetailResponse {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    fabric: string | null;
    color: string | null;
    size: string | null;
    price: number;
    discountPrice: number | null;
    availableQuantity: number;
    media: ProductMedia[];
}

export async function createProduct(
    request: AdminProductFormData
): Promise<ProductResponse> {
    const { data } =
        await api.post<ProductResponse>(
            "/products",
            request
        );

    return data;
}

export async function getProducts(): Promise<AdminProduct[]> {
    const { data } =
        await api.get<AdminProduct[]>(
            "/products"
        );

    return data;
}

export async function getProductById(
    id: string
): Promise<ProductDetailResponse> {
    const { data } =
        await api.get<ProductDetailResponse>(
            `/products/${id}`
        );

    return data;
}

export async function updateProduct(
    id: string,
    request: AdminProductFormData
): Promise<ProductResponse> {
    const { data } =
        await api.put<ProductResponse>(
            `/products/${id}`,
            request
        );

    return data;
}

export async function deleteProduct(
    id: string
): Promise<void> {
    await api.delete(
        `/products/${id}`
    );
}

export async function uploadProductMedia(
    productId: string,
    files: File[]
): Promise<void> {

    const formData = new FormData();

    files.forEach((file) => {
        formData.append(
            "files",
            file
        );
    });

    await api.post(
        `/products/${productId}/media`,
        formData
    );
}

export async function deleteProductMedia(
    productId: string,
    mediaId: string
): Promise<void> {
    await api.delete(
        `/products/${productId}/media/${mediaId}`
    );
}

export async function setPrimaryProductMedia(
    productId: string,
    mediaId: string
): Promise<void> {
    await api.patch(
        `/products/${productId}/media/${mediaId}/primary`
    );
}

export async function reorderProductMedia(
    productId: string,
    mediaIds: string[]
): Promise<void> {
    await api.patch(
        `/products/${productId}/media/reorder`,
        {
            mediaIds,
        }
    );
}

export async function replaceProductMedia(
    productId: string,
    mediaId: string,
    file: File
): Promise<void> {

    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    await api.patch(
        `/products/${productId}/media/${mediaId}`,
        formData
    );
}