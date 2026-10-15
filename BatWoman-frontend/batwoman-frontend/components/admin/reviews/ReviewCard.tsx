"use client";

import { useState } from "react";
import {
    Star,
    ExternalLink,
    Loader2,
} from "lucide-react";

import { AdminReview } from "@/services/adminReview.service";
import { getProductById } from "@/services/adminProduct.service";

import DeleteReviewDialog from "./DeleteReviewDialog";

interface Props {
    review: AdminReview;
    onDelete: (reviewId: string) => void;
}

export default function ReviewCard({
                                       review,
                                       onDelete,
                                   }: Props) {
    const [loading, setLoading] = useState(false);

    const handleViewProduct = async () => {
        try {
            setLoading(true);

            const product = await getProductById(review.productId);

            if (product?.slug) {
                window.open(
                    `/customer/products/${product.slug}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        } catch (err) {
            console.error("Failed to fetch product details:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="group rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-5 shadow-[0_2px_10px_rgba(61,48,40,0.03)] transition-all duration-200 hover:border-[#D9C6A5] hover:shadow-[0_6px_20px_rgba(61,48,40,0.06)] sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div
                        className="flex items-center gap-1"
                        aria-label={`${review.rating} out of 5 stars`}
                    >
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                                key={index}
                                size={17}
                                strokeWidth={1.6}
                                aria-hidden="true"
                                className={
                                    index < review.rating
                                        ? "fill-[#C2A16A] text-[#C2A16A]"
                                        : "text-[#DDD4C7]"
                                }
                            />
                        ))}
                    </div>

                    <h2 className="mt-4 break-words text-xl font-semibold tracking-tight text-[#3D3028] sm:text-2xl">
                        {review.productName}
                    </h2>

                    <p className="mt-1 text-sm text-[#8A7A6C]">
                        Reviewed by{" "}
                        <span className="font-medium text-[#59483A]">
                            {review.customerName}
                        </span>
                    </p>
                </div>

                <time
                    dateTime={review.createdAt}
                    className="shrink-0 text-xs font-medium text-[#9A8B7B] sm:pt-1"
                >
                    {new Date(review.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }
                    )}
                </time>
            </div>

            <div className="mt-7 rounded-xl border border-[#F0E9DF] bg-[#FAF7F2] p-4 sm:p-5">
                <h3 className="text-base font-semibold text-[#59483A]">
                    {review.title}
                </h3>

                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-[#75675C]">
                    {review.comment}
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-[#EAE3D8] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <DeleteReviewDialog
                    onDelete={() => onDelete(review.reviewId)}
                />

                <button
                    type="button"
                    onClick={handleViewProduct}
                    disabled={loading}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#E5D8C4] bg-white px-4 py-2.5 text-sm font-medium text-[#806744] transition-colors hover:border-[#B99A65] hover:bg-[#F5EFE5] hover:text-[#59452F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <span>Loading...</span>
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        </>
                    ) : (
                        <>
                            <span>View Product</span>
                            <ExternalLink size={16} />
                        </>
                    )}
                </button>
            </div>
        </article>
    );
}