"use client";

import { useMemo, useState } from "react";

import ReviewCard from "@/components/admin/reviews/ReviewCard";
import ReviewStats from "@/components/admin/reviews/ReviewStats";
import ReviewFilters from "@/components/admin/reviews/ReviewFilters";
import EmptyReviews from "@/components/admin/reviews/EmptyReviews";

import {
    useAdminReviews,
    useDeleteReview,
} from "@/hooks/useAdminReviews";

export default function AdminReviewsPage() {

    const {

        data: reviews = [],

        isLoading,

        isError,

    } = useAdminReviews();

    const deleteMutation = useDeleteReview();

    const [search, setSearch] = useState("");

    const [rating, setRating] = useState(0);

    function handleDelete(reviewId: string) {

        deleteMutation.mutate(reviewId);

    }

    const averageRating =

        reviews.length === 0

            ? 0

            : reviews.reduce(

            (sum, review) => sum + review.rating,

            0

        ) / reviews.length;

    const uniqueProducts = new Set(

        reviews.map(

            review => review.productId

        )

    ).size;

    const filteredReviews = useMemo(() => {

        return reviews.filter((review) => {

            const matchesSearch =

                review.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                review.productName
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                review.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                review.comment
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesRating =

                rating === 0 ||

                review.rating === rating;

            return matchesSearch && matchesRating;

        });

    }, [

        reviews,

        search,

        rating,

    ]);

    if (isLoading) {

        return (

            <section className="space-y-8">

                <h1 className="text-4xl font-bold">

                    Reviews

                </h1>

                <p>Loading reviews...</p>

            </section>

        );

    }

    if (isError) {

        return (

            <section className="space-y-8">

                <h1 className="text-4xl font-bold">

                    Reviews

                </h1>

                <p>

                    Failed to load reviews.

                </p>

            </section>

        );

    }

    return (

        <section className="space-y-10">

            <div>

                <h1 className="text-4xl font-bold">

                    Reviews

                </h1>

                <p className="mt-2 text-neutral-500">

                    Manage customer feedback across your store.

                </p>

            </div>

            <ReviewStats

                totalReviews={reviews.length}

                averageRating={averageRating}

                productsReviewed={uniqueProducts}

            />

            <ReviewFilters

                search={search}

                setSearch={setSearch}

                rating={rating}

                setRating={setRating}

            />

            {

                filteredReviews.length === 0 ? (

                    <EmptyReviews />

                ) : (

                    <div className="space-y-6">

                        {

                            filteredReviews.map((review) => (

                                <ReviewCard

                                    key={review.reviewId}

                                    review={review}

                                    onDelete={handleDelete}

                                />

                            ))

                        }

                    </div>

                )

            }

        </section>

    );

}