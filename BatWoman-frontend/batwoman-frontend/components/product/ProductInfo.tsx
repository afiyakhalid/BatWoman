"use client";

import { useState } from "react";
import { ProductDetail } from "@/types/product-detail";
import { Star, Minus, Plus } from "lucide-react";
import { useReviews } from "@/hooks/useReviews";
import ReviewForm from "./ReviewForm";
import { useCreateReview } from "@/hooks/useCreateReview";
import { useAddToCart } from "@/hooks/useAddToCart";

interface ProductInfoProps {
    product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);

    const [isInfoOpen, setIsInfoOpen] = useState(true);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isReturnOpen, setIsReturnOpen] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);

    const [showReviewForm, setShowReviewForm] = useState(false);

    const {
        data: reviews,
        isLoading: reviewsLoading,
    } = useReviews(product.id);

    const createReviewMutation = useCreateReview(product.id);
    const addToCartMutation = useAddToCart();

    /*
     * ============================================================
     * RATING
     * ============================================================
     */

    const averageRating =
        reviews && reviews.length > 0
            ? (
                reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : "0.0";

    /*
     * ============================================================
     * INVENTORY
     * ============================================================
     *
     * The backend may return availableQuantity as null.
     *
     * Normalize it once so the rest of this component always
     * works with a predictable value.
     */

    const availableQuantity = product.availableQuantity ?? null;

    const hasInventoryData = availableQuantity !== null;

    const isOutOfStock =
        availableQuantity !== null &&
        availableQuantity <= 0;

    /*
     * If the backend does not provide inventory information,
     * don't artificially restrict the quantity selector.
     */
    const maxQuantity = availableQuantity ?? Infinity;

    /*
     * ============================================================
     * QUANTITY CONTROLS
     * ============================================================
     */

    const increaseQuantity = () => {
        setQuantity((current) =>
            Math.min(current + 1, maxQuantity)
        );
    };

    const decreaseQuantity = () => {
        setQuantity((current) =>
            Math.max(1, current - 1)
        );
    };

    return (
        <div className="w-full text-neutral-900">

            {/* =========================================================
                TITLE
            ========================================================== */}

            <h1 className="font-[var(--font-playfair)] text-5xl leading-tight tracking-wide">
                {product.name}
            </h1>

            {/* =========================================================
                RATINGS
            ========================================================== */}

            <div className="mt-5 flex items-center gap-3">

                <div className="flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            size={16}
                            fill={
                                index <
                                Math.round(Number(averageRating))
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    ))}
                </div>

                <span className="text-sm text-neutral-500">
                    {averageRating} ({reviews?.length ?? 0} Reviews)
                </span>

            </div>

            {/* =========================================================
                PRICE
            ========================================================== */}

            <div className="mt-8 flex items-center gap-5">

                <span className="text-5xl font-light">
                    ₹{product.discountPrice ?? product.price}
                </span>

                {product.discountPrice !== null && (
                    <span className="text-2xl font-light text-neutral-400 line-through">
                        ₹{product.price}
                    </span>
                )}

            </div>

            <div className="my-8 border-t border-neutral-200" />

            {/* =========================================================
                DESCRIPTION
            ========================================================== */}

            <p className="mt-8 max-w-xl text-[16px] leading-8 text-neutral-600">
                {product.description || "No description available."}
            </p>

            <div className="my-8 border-t border-neutral-200" />

            {/* =========================================================
                QUANTITY
            ========================================================== */}

            <div className="mt-10">

                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-neutral-800">
                    Quantity
                </label>

                <div className="flex w-28 items-center justify-between border border-neutral-300 bg-white px-3 py-2">

                    <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="
                            p-1
                            text-neutral-400
                            transition
                            hover:text-black
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} />
                    </button>

                    <span className="text-sm font-normal text-neutral-800">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={
                            isOutOfStock ||
                            quantity >= maxQuantity
                        }
                        className="
                            p-1
                            text-neutral-400
                            transition
                            hover:text-black
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                        aria-label="Increase quantity"
                    >
                        <Plus size={14} />
                    </button>

                </div>

            </div>

            <div className="my-8 border-t border-neutral-200" />

            {/* =========================================================
                CART / BUY NOW
            ========================================================== */}

            <div className="flex w-full flex-col gap-3 sm:flex-row">

                <button
                    type="button"
                    onClick={() =>
                        addToCartMutation.mutate({
                            productId: product.id,
                            quantity,
                        })
                    }
                    disabled={
                        isOutOfStock ||
                        addToCartMutation.isPending
                    }
                    className="
                        flex-1
                        bg-black
                        py-5
                        text-lg
                        font-light
                        tracking-wide
                        text-white
                        transition
                        hover:bg-neutral-800
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {isOutOfStock
                        ? "Out of Stock"
                        : addToCartMutation.isPending
                            ? "Adding..."
                            : "Add to Cart"}
                </button>

                <button
                    type="button"
                    disabled={isOutOfStock}
                    className="
                        flex-1
                        border
                        border-black
                        bg-white
                        py-5
                        text-lg
                        font-light
                        tracking-wide
                        text-black
                        transition
                        hover:bg-neutral-50
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    Buy Now
                </button>

            </div>

            {/* =========================================================
                ADD TO CART STATUS
            ========================================================== */}

            {addToCartMutation.isError && (
                <p className="mt-4 text-sm text-red-600">
                    Unable to add this product to your cart. Please try
                    again.
                </p>
            )}

            {addToCartMutation.isSuccess && (
                <p className="mt-4 text-sm font-medium text-green-600">
                    Product added to cart successfully.
                </p>
            )}

            <div className="my-8 border-t border-neutral-200" />

            {/* =========================================================
                ACCORDION PANELS
            ========================================================== */}

            <div className="space-y-1">

                {/* =====================================================
                    PRODUCT INFORMATION
                ====================================================== */}

                <div className="border-b border-neutral-200 pb-3">

                    <button
                        type="button"
                        onClick={() =>
                            setIsInfoOpen(!isInfoOpen)
                        }
                        className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            py-4
                            text-left
                        "
                    >

                        <div>

                            <h3 className="text-lg font-medium text-neutral-900 transition group-hover:text-neutral-600">
                                Product Information
                            </h3>

                            <p className="mt-1 text-sm text-neutral-500">
                                Premium Fabric • Sizes • Care Instructions
                            </p>

                        </div>

                        <span className="text-2xl font-light text-neutral-400">
                            {isInfoOpen ? "—" : "+"}
                        </span>

                    </button>

                    {isInfoOpen && (
                        <div className="mt-2 max-w-xl space-y-4 pb-4 text-sm leading-7 text-neutral-600">

                            <p>
                                Crafted with premium-quality fabric for
                                elegance, comfort, and durability.
                                Designed for modern modest fashion with
                                timeless styling suitable for both everyday
                                wear and special occasions.
                            </p>

                            <div className="space-y-1.5 border-t border-neutral-100 pt-3 font-medium text-neutral-800">

                                {product.fabric && (
                                    <p>
                                        Fabric:{" "}
                                        <span className="font-normal text-neutral-600">
                                            {product.fabric}
                                        </span>
                                    </p>
                                )}

                                {product.color && (
                                    <p>
                                        Color:{" "}
                                        <span className="font-normal text-neutral-600">
                                            {product.color}
                                        </span>
                                    </p>
                                )}

                                {product.size && (
                                    <p>
                                        Size:{" "}
                                        <span className="font-normal text-neutral-600">
                                            {product.size}
                                        </span>
                                    </p>
                                )}

                                <p>
                                    Availability:{" "}
                                    <span className="font-normal text-neutral-600">
                                        {!hasInventoryData
                                            ? "Availability unavailable"
                                            : isOutOfStock
                                                ? "Out of Stock"
                                                : `${availableQuantity} available`}
                                    </span>
                                </p>

                            </div>

                        </div>
                    )}

                </div>

                {/* =====================================================
                    SHIPPING
                ====================================================== */}

                <div className="border-b border-neutral-200 pb-3">

                    <button
                        type="button"
                        onClick={() =>
                            setIsShippingOpen(!isShippingOpen)
                        }
                        className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            py-4
                            text-left
                        "
                    >

                        <div>

                            <h3 className="text-lg font-medium text-neutral-900 transition group-hover:text-neutral-600">
                                Shipping Information
                            </h3>

                            <p className="mt-1 text-sm text-neutral-500">
                                Delivery & Tracking
                            </p>

                        </div>

                        <span className="text-2xl font-light text-neutral-400">
                            {isShippingOpen ? "—" : "+"}
                        </span>

                    </button>

                    {isShippingOpen && (
                        <div className="mt-2 max-w-xl pb-4 text-sm leading-7 text-neutral-600">

                            <p>
                                Orders are processed within 1–2 business
                                days. Delivery times vary by location. Once
                                dispatched, you will receive a tracking number
                                to monitor your shipment.
                            </p>

                        </div>
                    )}

                </div>

                {/* =====================================================
                    RETURNS
                ====================================================== */}

                <div className="border-b border-neutral-200 pb-3">

                    <button
                        type="button"
                        onClick={() =>
                            setIsReturnOpen(!isReturnOpen)
                        }
                        className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            py-4
                            text-left
                        "
                    >

                        <div>

                            <h3 className="text-lg font-medium text-neutral-900 transition group-hover:text-neutral-600">
                                Return & Refund Policy
                            </h3>

                            <p className="mt-1 text-sm text-neutral-500">
                                Returns within 7 days
                            </p>

                        </div>

                        <span className="text-2xl font-light text-neutral-400">
                            {isReturnOpen ? "—" : "+"}
                        </span>

                    </button>

                    {isReturnOpen && (
                        <div className="mt-2 max-w-xl pb-4 text-sm leading-7 text-neutral-600">

                            <p>
                                Returns are accepted within 7 days of
                                delivery for unused products in their
                                original condition. Refunds are processed
                                after quality inspection.
                            </p>

                        </div>
                    )}

                </div>

                {/* =====================================================
                    REVIEWS
                ====================================================== */}

                <div className="border-b border-neutral-200">

                    <button
                        type="button"
                        onClick={() =>
                            setIsReviewsOpen(!isReviewsOpen)
                        }
                        className="
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            py-5
                            text-left
                        "
                    >

                        <div>

                            <h3 className="text-lg font-medium text-neutral-900 transition group-hover:text-neutral-600">
                                Reviews
                            </h3>

                            <p className="mt-1 text-sm text-neutral-500">
                                {reviews?.length ?? 0} Customer Reviews
                            </p>

                        </div>

                        <span className="text-2xl font-light text-neutral-400">
                            {isReviewsOpen ? "—" : "+"}
                        </span>

                    </button>

                    {isReviewsOpen && (
                        <div className="space-y-6 pb-6 text-sm">

                            {/* Loading */}

                            {reviewsLoading && (
                                <p className="text-neutral-500">
                                    Loading reviews...
                                </p>
                            )}

                            {/* No reviews */}

                            {!reviewsLoading &&
                                reviews?.length === 0 && (
                                    <p className="text-neutral-500">
                                        No reviews yet.
                                    </p>
                                )}

                            {/* Reviews */}

                            {reviews?.map((review) => (
                                <div
                                    key={review.id}
                                    className="border-b border-neutral-100 pb-6"
                                >

                                    <div className="flex items-center justify-between">

                                        <h4 className="font-medium text-neutral-900">
                                            {review.title}
                                        </h4>

                                        <div className="flex">

                                            {Array.from({
                                                length: review.rating,
                                            }).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    size={16}
                                                    fill="currentColor"
                                                    className="text-yellow-500"
                                                />
                                            ))}

                                        </div>

                                    </div>

                                    <p className="mt-1 text-sm text-neutral-500">
                                        {review.userName}
                                    </p>

                                    <p className="mt-1 text-xs text-neutral-400">
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <p className="mt-4 leading-7 text-neutral-700">
                                        {review.comment}
                                    </p>

                                </div>
                            ))}

                            {/* Write Review */}

                            <div className="pt-6">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowReviewForm(
                                            !showReviewForm
                                        )
                                    }
                                    className="
                                        border
                                        border-black
                                        px-8
                                        py-3
                                        transition
                                        hover:bg-black
                                        hover:text-white
                                    "
                                >
                                    {showReviewForm
                                        ? "Cancel"
                                        : "Write a Review"}
                                </button>

                            </div>

                            {/* Review Form */}

                            {showReviewForm && (
                                <ReviewForm
                                    loading={
                                        createReviewMutation.isPending
                                    }
                                    onSubmit={(
                                        title,
                                        rating,
                                        comment
                                    ) =>
                                        createReviewMutation.mutate({
                                            productId: product.id,
                                            rating,
                                            title,
                                            comment,
                                        })
                                    }
                                />
                            )}

                            {/* Review Success */}

                            {createReviewMutation.isSuccess && (
                                <p className="mt-4 font-medium text-green-600">
                                    Your review has been submitted
                                    successfully.
                                </p>
                            )}

                            {/* Review Error */}

                            {createReviewMutation.isError && (
                                <p className="mt-4 font-medium text-red-600">
                                    Unable to submit your review. Please try
                                    again.
                                </p>
                            )}

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}