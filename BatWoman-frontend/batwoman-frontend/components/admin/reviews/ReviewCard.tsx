"use client";

import { Trash2, Star, ExternalLink } from "lucide-react";
import { AdminReview } from "@/services/adminReview.service";
import DeleteReviewDialog from "./DeleteReviewDialog";
interface Props {

    review: AdminReview;

    onDelete: (reviewId: string) => void;

}

export default function ReviewCard({

                                       review,

                                       onDelete,

                                   }: Props) {

    return (

        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:shadow-md">

            <div className="flex items-start justify-between">

                <div>

                    <div className="flex items-center gap-1">

                        {

                            Array.from({

                                length: 5,

                            }).map((_, index) => (

                                <Star

                                    key={index}

                                    size={18}

                                    className={

                                        index < review.rating

                                            ? "fill-yellow-400 text-yellow-400"

                                            : "text-neutral-300"

                                    }

                                />

                            ))

                        }

                    </div>

                    <p className="mt-4 text-2xl font-semibold">

                        {review.productName}

                    </p>

                    <p className="mt-1 text-sm text-neutral-500">

                        by {review.customerName}

                    </p>

                </div>

                <span className="text-sm text-neutral-500">

                    {

                        new Date(

                            review.createdAt

                        ).toLocaleDateString()

                    }

                </span>

            </div>

            <div className="mt-8">

                <h3 className="font-semibold text-lg">

                    {review.title}

                </h3>

                <p className="mt-3 leading-7 text-neutral-700">

                    {review.comment}

                </p>

            </div>

            <div className="mt-8 flex items-center justify-between border-t pt-6">

                <DeleteReviewDialog
                    onDelete={() => onDelete(review.reviewId)}
                />

                <button

                    className="flex items-center gap-2 text-neutral-600 transition hover:text-black"

                >

                    View Product

                    <ExternalLink size={18} />

                </button>

            </div>

        </div>

    );

}