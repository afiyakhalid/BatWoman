export interface AdminProductMedia {
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    altText: string | null;
    primaryMedia: boolean;
    displayOrder: number;
    createdAt: string;
}

export interface AdminProductVariant {
    id: string;
    sizeId: string;
    size: string;
    numericSize: number | null;
    colorId: string;
    color: string;
    colorCode: string;
    colorHexCode: string | null;
    sku: string;
    active: boolean;
    availableQuantity: number;
    reservedQuantity: number;
    totalQuantity: number;
}

export interface ProductVariantFormData {
    id?: string;
    sizeId: string;
    colorId: string;
    sku: string;
    initialStock: number | null;
    active: boolean;
}

export interface AdminProduct {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    fabric: string | null;
    price: number;
    discountPrice: number | null;
    featured: boolean;
    newArrival: boolean;
    active: boolean;

    category: {
        id: string;
        name: string;
    };

    media: AdminProductMedia[];

    variants: AdminProductVariant[];
}

export interface AdminProductFormData {
    categoryId: string;
    name: string;
    description: string;
    fabric: string;
    price: number;
    discountPrice: number | null;
    featured: boolean;
    newArrival: boolean;
    active: boolean;

    variants: ProductVariantFormData[];
}