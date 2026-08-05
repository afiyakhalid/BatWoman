import api from "@/lib/axios";

export interface AdminReview {

    reviewId: string;

    productId: string;

    productName: string;

    userId: string;

    customerName: string;

    rating: number;

    title: string;

    comment: string;

    status: string;

    createdAt: string;

}

export async function getAdminReviews() {

    const { data } = await api.get<AdminReview[]>(

        "/admin/reviews"

    );

    return data;

}

export async function deleteAdminReview(

    reviewId: string

) {

    await api.delete(

        `/admin/reviews/${reviewId}`

    );

}