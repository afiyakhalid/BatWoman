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
    
    const { data: reviews, isLoading: reviewsLoading } = useReviews(product.id);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const createReviewMutation = useCreateReview(product.id);
    const addToCartMutation = useAddToCart();

    // Compute active ratings dynamically based on backend data
    const averageRating =
        reviews && reviews.length > 0
            ? (
                reviews.reduce((sum, review) => sum + review.rating, 0) /
                reviews.length
              ).toFixed(1)
            : "0.0";

    return (
        <div className="w-full text-neutral-900 select-none">
            
            {/* Title */}
            <h1 className="font-[var(--font-playfair)] text-5xl leading-tight tracking-wide">
                {product.name}
            </h1>

            {/* Ratings (Computed dynamically) */}
            <div className="mt-5 flex items-center gap-3">
                <div className="flex text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            size={16}
                            fill={
                                index < Math.round(Number(averageRating))
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

            {/* Price */}
            <div className="mt-8 flex items-center gap-5">
                <span className="text-5xl font-light">
                    ₹{product.discountPrice ?? product.price}
                </span>
                {product.discountPrice && (
                    <span className="text-2xl text-neutral-400 line-through font-light">
                        ₹{product.price}
                    </span>
                )}
            </div>

            <div className="border-t border-neutral-200 my-8" />

            {/* Description */}
            <p className="mt-8 max-w-xl text-[16px] leading-8 text-neutral-600">
                {product.description || 
                    "Designed for women seeking timeless elegance. Crafted from premium fabric for exceptional comfort and durability."
                }
            </p>

            <div className="border-t border-neutral-200 my-8" />

            {/* Quantity */}
            <div className="mt-10">
                <label className="block text-xs font-medium tracking-[0.2em] text-neutral-800 uppercase mb-3">
                    Quantity
                </label>
                <div className="flex items-center border border-neutral-300 w-28 justify-between px-3 py-2 bg-white">
                    <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-neutral-400 hover:text-black transition p-1"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="text-sm font-normal text-neutral-800">{quantity}</span>
                    <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="text-neutral-400 hover:text-black transition p-1"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            <div className="border-t border-neutral-200 my-8" />

            {/* Luxury CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
    onClick={() =>
        addToCartMutation.mutate({
            productId: product.id,
            quantity,
        })
    }
    disabled={addToCartMutation.isPending}
    className="
        flex-1
        bg-black
        py-5
        text-white
        text-lg
        font-light
        tracking-wide
        transition
        hover:bg-neutral-800
        disabled:cursor-not-allowed
        disabled:opacity-60
    "
>
    {addToCartMutation.isPending
        ? "Adding..."
        : "Add to Cart"}
</button>
                <button className="flex-1 border border-black bg-white py-5 text-black text-lg font-light transition hover:bg-neutral-50 tracking-wide">
                    Buy Now
                </button>
            </div>

            <div className="border-t border-neutral-200 my-8" />

            {/* Accordion Panels */}
            <div className="space-y-1">
                
                {/* Product Info */}
                <div className="border-b border-neutral-200 pb-3">
                    <button
                        onClick={() => setIsInfoOpen(!isInfoOpen)}
                        className="flex items-center justify-between w-full py-4 text-left group"
                    >
                        <div>
                            <h3 className="text-lg font-medium text-neutral-900 transition group-hover:text-neutral-600">
                                Product Information
                            </h3>
                            <p className="mt-1 text-sm text-neutral-500">
                                Premium Fabric • Sizes • Care Instructions
                            </p>
                        </div>
                        <span className="text-2xl font-light text-neutral-400">{isInfoOpen ? "—" : "+"}</span>
                    </button>
                    
                    {isInfoOpen && (
                        <div className="mt-2 max-w-xl leading-7 text-neutral-600 text-sm space-y-4 pb-4">
                            <p>
                                Crafted with premium-quality fabric for elegance, comfort, and durability.
                                Designed for modern modest fashion with timeless styling suitable for both
                                everyday wear and special occasions.
                            </p>
                            
                            <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-neutral-800 font-medium">
                                {product.fabric && (
                                    <p>Fabric: <span className="font-normal text-neutral-600">{product.fabric}</span></p>
                                )}
                                {product.color && (
                                    <p>Color: <span className="font-normal text-neutral-600">{product.color}</span></p>
                                )}
                                {product.size && (
                                    <p>Size: <span className="font-normal text-neutral-600">{product.size}</span></p>
                                )}
                                <p>Availability: <span className="font-normal text-neutral-600">
                                    {product.availableQuantity && product.availableQuantity > 0 ? "In Stock" : "In Stock"}
                                </span></p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Shipping */}
                <div className="border-b border-neutral-200 pb-3">
                    <button
                        onClick={() => setIsShippingOpen(!isShippingOpen)}
                        className="flex items-center justify-between w-full py-4 text-left group"
                    >
                        <div>
                            <h3 className="text-lg font-medium text-neutral-900 transition group-hover:text-neutral-600">
                                Shipping Information
                            </h3>
                            <p className="mt-1 text-sm text-neutral-500">Delivery & Tracking</p>
                        </div>
                        <span className="text-2xl font-light text-neutral-400">{isShippingOpen ? "—" : "+"}</span>
                    </button>
                    {isShippingOpen && (
                        <div className="mt-2 max-w-xl leading-7 text-neutral-600 text-sm pb-4">
                            <p>
                                Orders are processed within 1–2 business days. Delivery times vary by
                                location. Once dispatched, you will receive a tracking number to monitor
                                your shipment.
                            </p>
                        </div>
                    )}
                </div>

                {/* Returns */}
                <div className="border-b border-neutral-200 pb-3">
                    <button
                        onClick={() => setIsReturnOpen(!isReturnOpen)}
                        className="flex items-center justify-between w-full py-4 text-left group"
                    >
                        <div>
                            <h3 className="text-lg font-medium text-neutral-900 transition group-hover:text-neutral-600">
                                Return & Refund Policy
                            </h3>
                            <p className="mt-1 text-sm text-neutral-500">Returns within 7 days</p>
                        </div>
                        <span className="text-2xl font-light text-neutral-400">{isReturnOpen ? "—" : "+"}</span>
                    </button>
                    {isReturnOpen && (
                        <div className="mt-2 max-w-xl leading-7 text-neutral-600 text-sm pb-4">
                            <p>
                                Returns are accepted within 7 days of delivery for unused products in their
                                original condition. Refunds are processed after quality inspection.
                            </p>
                        </div>
                    )}
                </div>

                {/* Reviews */}
                <div className="border-b border-neutral-200">
                    <button
                        onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                        className="flex w-full items-center justify-between py-5 text-left group"
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
                            {reviewsLoading && (
                                <p className="text-neutral-500">Loading reviews...</p>
                            )}

                            {!reviewsLoading && reviews?.length === 0 && (
                                <p className="text-neutral-500">No reviews yet.</p>
                            )}

                            {reviews?.map((review) => (
                                <div key={review.id} className="border-b border-neutral-100 pb-6">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-neutral-900">{review.title}</h4>
                                        <div className="flex">
                                            {Array.from({ length: review.rating }).map((_, index) => (
                                                <Star
                                                    key={index}
                                                    size={16}
                                                    fill="currentColor"
                                                    className="text-yellow-500"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mt-1 text-sm text-neutral-500">{review.userName}</p>
                                    <p className="mt-1 text-xs text-neutral-400">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="mt-4 leading-7 text-neutral-700">{review.comment}</p>
                                </div>
                            ))}

                            {/* Write Review Actions contained contextually within the expanded block */}
                            <div className="pt-6">
                                <button
                                    onClick={() => setShowReviewForm(!showReviewForm)}
                                    className="border border-black px-8 py-3 transition hover:bg-black hover:text-white"
                                >
                                    {showReviewForm ? "Cancel" : "Write a Review"}
                                </button>
                            </div>

                            {showReviewForm && (
                                <ReviewForm
                                    loading={createReviewMutation.isPending}
                                    onSubmit={(title, rating, comment) =>
                                        createReviewMutation.mutate({
                                            productId: product.id,
                                            rating,
                                            title,
                                            comment,
                                        })
                                    }
                                />
                            )}

                            {createReviewMutation.isSuccess && (
                                <p className="mt-4 text-green-600 font-medium">
                                    Your review has been submitted successfully.
                                </p>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}