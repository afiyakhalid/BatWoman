
"use client";

import { useState } from "react";
import { Heart, MapPin, Plus, Minus } from "lucide-react";

import { ProductDetail } from "@/types/product-detail";
import { useReviews } from "@/hooks/useReviews";
import ReviewForm from "./ReviewForm";
import { useCreateReview } from "@/hooks/useCreateReview";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useCartDrawerStore } from "@/store/cart.store";
import { useWishlist } from "@/hooks/useWishlist";
import QuantitySelector from "../cart/QuantitySelector";

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const requireAuth = useRequireAuth();
  const openCart = useCartDrawerStore((state) => state.openCart);

  const [quantity, setQuantity] = useState(1);

  // WISHLIST
  const {
    data: wishlist = [],
    addToWishlist,
    removeFromWishlist,
    isAdding,
    isRemoving,
  } = useWishlist();

  const isWishlisted = wishlist.some(
      (item) => item.product.id === product.id
  );

  const wishlistLoading = isAdding || isRemoving;

  const handleWishlistClick = () => {
    requireAuth(() => {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product.id);
      }
    });
  };

  // ACTIVE VARIANTS
  const activeVariants = product.variants.filter((v) => v.active);

  const bestDefaultVariant =
      activeVariants.find((v) => v.availableQuantity > 0) ??
      activeVariants[0] ??
      product.variants[0] ??
      null;

  const [selectedColorId, setSelectedColorId] = useState<string | null>(
      bestDefaultVariant?.colorId ?? null
  );

  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(
      bestDefaultVariant?.sizeId ?? null
  );

  // ACCORDIONS
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    sizeAndFit: false,
    materialAndCare: false,
    shippingAndReturns: false,
    reviews: false,
  });

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [showReviewForm, setShowReviewForm] = useState(false);

  // REVIEWS AND CART
  const { data: reviews = [] } = useReviews(product.id);
  const createReviewMutation = useCreateReview(product.id);
  const addToCartMutation = useAddToCart();

  // UNIQUE COLORS
  const availableColors = activeVariants.reduce(
      (acc, variant) => {
        if (!acc.some((item) => item.colorId === variant.colorId)) {
          acc.push(variant);
        }
        return acc;
      },
      [] as typeof product.variants
  );

  // VARIANTS FOR SELECTED COLOR
  const variantsForSelectedColor = activeVariants.filter(
      (variant) => variant.colorId === selectedColorId
  );

  const selectedVariant =
      variantsForSelectedColor.find(
          (variant) => variant.sizeId === selectedSizeId
      ) ??
      variantsForSelectedColor[0] ??
      null;

  const availableQuantity = selectedVariant?.availableQuantity ?? 0;
  const isOutOfStock = availableQuantity <= 0;

  const handleQuantityIncrease = () => {
    if (!selectedVariant || selectedVariant.availableQuantity <= 0) return;

    setQuantity((current) => Math.min(current + 1, selectedVariant.availableQuantity));
  };

  const handleQuantityDecrease = () => {
    if (!selectedVariant) return;

    setQuantity((current) => Math.max(1, current - 1));
  };

  // COLOR SELECTION
  const handleColorChange = (colorId: string) => {
    setSelectedColorId(colorId);

    const variantsForColor = activeVariants.filter(
        (v) => v.colorId === colorId
    );

    const inStockVariant =
        variantsForColor.find((v) => v.availableQuantity > 0) ??
        variantsForColor[0];

    setSelectedSizeId(inStockVariant?.sizeId ?? null);
    setQuantity(1);
  };

  // SIZE SELECTION
  const handleSizeChange = (sizeId: string) => {
    setSelectedSizeId(sizeId);
    setQuantity(1);
  };

  // ADD TO CART
  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;

    const qtyToAdd = Math.min(Math.max(1, quantity), selectedVariant.availableQuantity);

    requireAuth(() => {
      addToCartMutation.mutate(
          {
            variantId: selectedVariant.id,
            quantity: qtyToAdd,
          },
          {
            onSuccess: () => {
              openCart();
            },
          }
      );
    });
  };

  return (
      <div className="w-full text-neutral-900 lg:sticky lg:top-28">

        {/* PRODUCT TITLE AND PRICE */}
        <div className="flex items-start justify-between gap-6 pb-6 border-b border-neutral-100">
          <div>
            {product.category?.name && (
                <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400 font-normal mb-1.5">
                  {product.category.name}
                </p>
            )}

            <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.12] text-neutral-900 tracking-normal">
              {product.name}
            </h1>
          </div>

          <div className="text-right shrink-0 pt-1">
            <div className="flex flex-col items-end">
            <span className="text-base sm:text-lg lg:text-xl font-light tracking-wide text-black">
              ₹{(product.discountPrice ?? product.price).toLocaleString()}
            </span>

              {product.discountPrice !== null && (
                  <span className="text-xs font-light text-neutral-400 line-through">
                ₹{product.price.toLocaleString()}
              </span>
              )}
            </div>
          </div>
        </div>

        {/* WISHLIST BUTTON */}
        <div className="flex justify-end pt-4">
          <button
              type="button"
              onClick={handleWishlistClick}
              disabled={wishlistLoading}
              aria-label={
                isWishlisted
                    ? "Remove product from wishlist"
                    : "Add product to wishlist"
              }
              aria-pressed={isWishlisted}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-600 transition hover:text-black disabled:opacity-50"
          >
            <Heart
                size={17}
                strokeWidth={1.4}
                className={isWishlisted ? "fill-black text-black" : ""}
            />

            {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
          </button>
        </div>

        {/* COLOR SELECTION */}
        {availableColors.length > 0 && (
            <div className="pt-6 pb-4">
              <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.16em] text-neutral-500 font-medium">
              Color:
            </span>

                <span className="text-xs tracking-[0.1em] text-black uppercase font-medium">
              {selectedVariant?.color || availableColors[0]?.color}
            </span>
              </div>

              <div className="flex items-center gap-2.5">
                {availableColors.map((variant) => {
                  const isSelected = variant.colorId === selectedColorId;

                  return (
                      <button
                          key={variant.colorId}
                          type="button"
                          onClick={() => handleColorChange(variant.colorId)}
                          className={`
                    relative h-6 w-6 border transition-all rounded-none p-0.5
                    ${
                              isSelected
                                  ? "border-black ring-1 ring-black"
                                  : "border-neutral-300 hover:border-neutral-600"
                          }
                  `}
                          title={variant.color}
                          aria-label={`Select color ${variant.color}`}
                      >
                  <span
                      className="block h-full w-full"
                      style={{
                        backgroundColor: variant.colorHexCode || "#111111",
                      }}
                  />
                      </button>
                  );
                })}
              </div>
            </div>
        )}

        {/* SIZE SELECTION */}
        {variantsForSelectedColor.length > 0 && (
            <div className="pt-4 pb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.16em] text-neutral-500 font-medium">
                Size:
              </span>

                  <span className="text-xs tracking-[0.1em] text-black uppercase font-medium">
                {selectedVariant?.size || "Select Size"}
              </span>
                </div>

                <button
                    type="button"
                    onClick={() => toggleAccordion("sizeAndFit")}
                    className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 hover:text-black underline underline-offset-4 transition"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {variantsForSelectedColor.map((variant) => {
                  const isSelected = variant.sizeId === selectedSizeId;
                  const isUnavailable = variant.availableQuantity <= 0;

                  return (
                      <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleSizeChange(variant.sizeId)}
                          disabled={isUnavailable}
                          className={`
                    min-w-[36px] py-1 text-xs uppercase tracking-[0.15em] transition border-b-2
                    ${
                              isSelected
                                  ? "border-black font-semibold text-black"
                                  : "border-transparent text-neutral-600 hover:text-black"
                          }
                    ${
                              isUnavailable
                                  ? "line-through opacity-30 cursor-not-allowed"
                                  : ""
                          }
                  `}
                      >
                        {variant.size}
                      </button>
                  );
                })}
              </div>

              {selectedVariant && isOutOfStock && (
                  <p className="mt-2 text-xs text-red-600 tracking-wide">
                    Selected size is currently out of stock
                  </p>
              )}
            </div>
        )}

        {/* PRODUCT DESCRIPTION */}
        <div className="pt-2 pb-6">
          <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700 tracking-wide font-normal">
            {product.description ||
                "A masterfully tailored piece cut for fluid movement and understated luxury. Designed for effortless grace and timeless sophistication."}
          </p>
        </div>

        {/* ADD TO CART */}
        <div className="pt-2 pb-5 space-y-3">
          {selectedVariant && !isOutOfStock && (
              <div className="flex items-center justify-between gap-3 pb-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 font-medium">
                  Quantity
                </span>
                <QuantitySelector
                    quantity={quantity}
                    onIncrease={handleQuantityIncrease}
                    onDecrease={handleQuantityDecrease}
                />
              </div>
          )}

          <button
              type="button"
              onClick={handleAddToCart}
              disabled={
                  !selectedVariant ||
                  isOutOfStock ||
                  addToCartMutation.isPending
              }
              className="
            w-full bg-black py-4 text-xs uppercase tracking-[0.25em] font-medium text-white
            transition-all duration-300 hover:bg-neutral-800 rounded-none active:scale-[0.99]
            disabled:cursor-not-allowed disabled:opacity-50
          "
          >
            {!selectedVariant
                ? "Select Size"
                : isOutOfStock
                    ? "Out of Stock"
                    : addToCartMutation.isPending
                        ? "Adding to Bag..."
                        : "Add To Cart"}
          </button>

          {addToCartMutation.isSuccess && (
              <p className="text-center text-xs tracking-wider uppercase text-neutral-800">
                Added to your shopping bag
              </p>
          )}
        </div>

        {/* SHIPPING INFORMATION */}
        <div className="flex items-center gap-2 pt-1 pb-6 text-xs tracking-wider uppercase text-neutral-600">
          <MapPin size={13} strokeWidth={1.5} />
          <span>Shipping charges calculated at checkout</span>
        </div>

        {/* PRODUCT ACCORDIONS */}
        <div className="divide-y divide-neutral-200 border-t border-neutral-200">

          {/* SIZE AND FIT */}
          <div className="py-4">
            <button
                type="button"
                onClick={() => toggleAccordion("sizeAndFit")}
                className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.18em] font-medium text-neutral-900"
            >
              <span>Size and Fit</span>

              <span className="text-neutral-400">
              {openAccordions.sizeAndFit ? (
                  <Minus size={13} strokeWidth={1.5} />
              ) : (
                  <Plus size={13} strokeWidth={1.5} />
              )}
            </span>
            </button>

            {openAccordions.sizeAndFit && (
                <div className="mt-3 text-xs leading-relaxed text-neutral-600 space-y-2">
                  <p>
                    Designed for a relaxed, elegant silhouette that drapes naturally.
                  </p>
                  <p>Model is wearing size S. Length measures 56 inches.</p>
                </div>
            )}
          </div>

          {/* MATERIAL AND CARE */}
          <div className="py-4">
            <button
                type="button"
                onClick={() => toggleAccordion("materialAndCare")}
                className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.18em] font-medium text-neutral-900"
            >
              <span>Material and Care</span>

              <span className="text-neutral-400">
              {openAccordions.materialAndCare ? (
                  <Minus size={13} strokeWidth={1.5} />
              ) : (
                  <Plus size={13} strokeWidth={1.5} />
              )}
            </span>
            </button>

            {openAccordions.materialAndCare && (
                <div className="mt-3 text-xs leading-relaxed text-neutral-600 space-y-2">
                  <p>
                    Fabric:{" "}
                    <span className="text-black font-medium">
                  {product.fabric || "Premium Haute Fabric"}
                </span>
                  </p>

                  <p>Dry clean only. Store in a cool, dry garment bag.</p>
                </div>
            )}
          </div>

          {/* SHIPPING AND RETURNS */}
          <div className="py-4">
            <button
                type="button"
                onClick={() => toggleAccordion("shippingAndReturns")}
                className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.18em] font-medium text-neutral-900"
            >
              <span>Shipping and Returns</span>

              <span className="text-neutral-400">
              {openAccordions.shippingAndReturns ? (
                  <Minus size={13} strokeWidth={1.5} />
              ) : (
                  <Plus size={13} strokeWidth={1.5} />
              )}
            </span>
            </button>

            {openAccordions.shippingAndReturns && (
                <div className="mt-3 space-y-2 text-xs leading-relaxed text-neutral-600">
                  <p>
                    Delivery charges apply unless a promotion states otherwise.
                    Delivery times may vary.
                  </p>

                  <p>
                    All purchases are final. We do not accept returns or exchanges.
                  </p>

                  <p>
                    Please review product descriptions, sizing information and
                    order details carefully before placing your order.
                  </p>

                  <p>
                    If an order arrives damaged or incorrect, please contact
                    customer support promptly so the issue can be reviewed in
                    accordance with applicable consumer laws.
                  </p>
                </div>
            )}
          </div>

          {/* CUSTOMER REVIEWS */}
          <div className="py-4">
            <button
                type="button"
                onClick={() => toggleAccordion("reviews")}
                className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.18em] font-medium text-neutral-900"
            >
              <span>Customer Reviews ({reviews.length})</span>

              <span className="text-neutral-400">
              {openAccordions.reviews ? (
                  <Minus size={13} strokeWidth={1.5} />
              ) : (
                  <Plus size={13} strokeWidth={1.5} />
              )}
            </span>
            </button>

            {openAccordions.reviews && (
                <div className="mt-4 space-y-4">
                  {reviews.length === 0 ? (
                      <p className="text-xs text-neutral-500">
                        No reviews yet for this garment.
                      </p>
                  ) : (
                      <div className="space-y-3">
                        {reviews.map((rev) => (
                            <div
                                key={rev.id}
                                className="border-b border-neutral-100 pb-3 text-xs"
                            >
                              <div className="flex items-center justify-between font-medium text-black">
                        <span>
                          {rev.userName
                              ?.replace(/\s+null$/i, "")
                              .trim() || "Verified Client"}
                        </span>

                                <span>{rev.rating} / 5</span>
                              </div>

                              <p className="mt-1 text-neutral-600">
                                {rev.comment}
                              </p>
                            </div>
                        ))}
                      </div>
                  )}

                  <button
                      type="button"
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="mt-3 text-xs uppercase tracking-[0.15em] text-black underline underline-offset-4"
                  >
                    {showReviewForm ? "Close Review Form" : "Write a Review"}
                  </button>

                  {showReviewForm && (
                      <div className="mt-4 pt-3 border-t border-neutral-100">
                        <ReviewForm
                            onSubmit={(title, rating, comment) => {
                              createReviewMutation.mutate(
                                  {
                                    productId: product.id,
                                    title,
                                    rating,
                                    comment,
                                  },
                                  {
                                    onSuccess: () => setShowReviewForm(false),
                                  }
                              );
                            }}
                            loading={createReviewMutation.isPending}
                        />
                      </div>
                  )}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}
