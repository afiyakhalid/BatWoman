import api from "@/lib/axios";

export interface Category {

    id: string;

    name: string;

    description: string;

    imageUrl: string;

    createdAt: string;
}

export async function getCategories(): Promise<Category[]> {

    const { data } = await api.get(
        "/categories"
    );

    return data;
}

export async function getCategory(
    id: string
): Promise<Category> {

    const { data } = await api.get(
        `/categories/${id}`
    );

    return data;
}