import api from "@/lib/axios";

import {
    AdminProduct,
    AdminProductFormData,
    AdminProductVariant,
} from "@/types/admin-product";

import { Color } from "@/types/color";

export interface ProductResponse {
    id: string;
    name: string;
    slug: string;
}

export interface ProductMedia {
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    objectKey?: string;
    altText: string | null;
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
    price: number;
    discountPrice: number | null;
    availableQuantity: number;
    variants: AdminProductVariant[];
    media: ProductMedia[];
}

export interface AdminSize {
    id: string;
    label: string;
    numericValue: number;
}

export interface CreateProductRequest {
    categoryId: string;
    name: string;
    description: string;
    fabric: string;
    price: number;
    discountPrice: number | null;
    featured: boolean;
    newArrival: boolean;

    variants: {
        sizeId: string;
        colorId: string;
        sku: string;
        initialStock: number;
    }[];
}

export async function createProduct(
    request: CreateProductRequest
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
            "/products/admin"
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

export async function getAdminColors(): Promise<Color[]> {
    const { data } =
        await api.get<Color[]>(
            "/colors/admin"
        );

    return data;
}

export async function createColor(
    request: {
        name: string;
        code: string;
        hexCode?: string;
        displayOrder?: number;
    }
): Promise<Color> {
    const { data } =
        await api.post<Color>(
            "/colors",
            request
        );

    return data;
}

export async function getAdminSizes(): Promise<AdminSize[]> {
    const { data } =
        await api.get<AdminSize[]>(
            "/sizes"
        );

    return data;
}

export async function uploadProductMedia(
    productId: string,
    files: File[]
): Promise<void> {
    const formData =
        new FormData();

    files.forEach(
        (file) =>
            formData.append(
                "files",
                file
            )
    );

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
    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    await api.patch(
        `/products/${productId}/media/${mediaId}`,
        formData
    );
}