import { Category } from "@/types/category";

export interface AdminProductMedia {
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    altText: string | null;
    primaryMedia: boolean;
    displayOrder: number;
    createdAt: string;
}


export interface AdminProduct {

    id: string;

    name: string;

    slug: string;

    description: string | null;

    fabric: string | null;

    color: string | null;

    size: string | null;

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

}

export interface AdminProductFormData {

    categoryId: string;

    name: string;

    description: string;

    fabric: string;

    color: string;

    size: string;

    price: number;

    discountPrice: number | null;

    featured: boolean;

    newArrival: boolean;

    active: boolean;

}