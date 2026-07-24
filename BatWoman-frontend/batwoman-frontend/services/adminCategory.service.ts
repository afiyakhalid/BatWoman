import api from "@/lib/axios";

export interface Category {

    id: string;

    name: string;

    slug: string;

    description: string;

}

export interface CreateCategoryRequest {

    name: string;

    description: string;

}

export interface UpdateCategoryRequest {

    name: string;

    description: string;

}

export async function getCategories(): Promise<Category[]> {

    const { data } = await api.get<Category[]>(
        "/categories"
    );

    return data;

}

export async function createCategory(
    request: CreateCategoryRequest
): Promise<Category> {

    const { data } = await api.post<Category>(
        "/categories",
        request
    );

    return data;

}

export async function updateCategory(
    id: string,
    request: UpdateCategoryRequest
): Promise<Category> {

    const { data } = await api.put<Category>(
        `/categories/${id}`,
        request
    );

    return data;

}

export async function deleteCategory(
    id: string
): Promise<void> {

    await api.delete(
        `/categories/${id}`
    );

}