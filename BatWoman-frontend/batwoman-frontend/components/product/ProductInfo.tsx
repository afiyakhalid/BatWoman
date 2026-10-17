"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus, Minus } from "lucide-react";

import { ProductDetail } from "@/types/product-detail";
import { useReviews } from "@/hooks/useReviews";
import ReviewForm from "./ReviewForm";
import { useCreateReview } from "@/hooks/useCreateReview";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useRequireAuth } from "@/hooks/useRequireAuth";

interface ProductInfoProps {
  product: ProductDetail;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const requireAuth = useRequireAuth();

  const [quantity, setQuantity] = useState(1);

  // Active variants
  const activeVariants = product.variants.filter((v) => v.active);

  // Variant resolution: prefer first active variant with stock > 0
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

  // Sync selection when product variants change (e.g. admin stock updates or removed variants)
  useEffect(() => {
    const active = product.variants.filter((v) => v.active);
    if (active.length === 0) return;

    const currentValid = active.some(
      (v) => v.colorId === selectedColorId && v.sizeId === selectedSizeId
    );

    if (!currentValid) {
      const best =
        active.find((v) => v.availableQuantity > 0) ??
        active[0];
      if (best) {
        setSelectedColorId(best.colorId);
        setSelectedSizeId(best.sizeId);
      }
    }
  }, [product.variants, selectedColorId, selectedSizeId]);

  // Accordions
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

  // Reviews
  const { data: reviews = [] } = useReviews(product.id);
  const createReviewMutation = useCreateReview(product.id);
  const addToCartMutation = useAddToCart();

  // Unique colors
  const availableColors = activeVariants.reduce(
    (acc, variant) => {
      if (!acc.some((item) => item.colorId === variant.colorId)) {
        acc.push(variant);
      }
      return acc;
    },
    [] as typeof product.variants
  );

  // Variants for selected color
  const variantsForSelectedColor = activeVariants.filter(
    (variant) => variant.colorId === selectedColorId
  );

  // Resolved selected variant
  const selectedVariant =
    variantsForSelectedColor.find(
      (variant) => variant.sizeId === selectedSizeId
    ) ?? null;

  const availableQuantity = selectedVariant?.availableQuantity ?? 0;
  const isOutOfStock = availableQuantity <= 0;
  const maxQuantity = Math.max(0, availableQuantity);

  const handleColorChange = (colorId: string) => {
    setSelectedColorId(colorId);
    const variantsForColor = activeVariants.filter((v) => v.colorId === colorId);
    const inStockVariant =
      variantsForColor.find((v) => v.availableQuantity > 0) ??
      variantsForColor[0];
    setSelectedSizeId(inStockVariant?.sizeId ?? null);
    setQuantity(1);
  };

  const handleSizeChange = (sizeId: string) => {
    setSelectedSizeId(sizeId);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;
    requireAuth(() => {
      addToCartMutation.mutate({
        variantId: selectedVariant.id,
        quantity,
      });
    });
  };

  return (
    <div className="w-full text-neutral-900 lg:sticky lg:top-28">
      {/* =====================================================
          TOP ROW: PRODUCT TITLE (BIGGER & CLASSY) & PRICE
      ====================================================== */}
      <div className="flex items-start justify-between gap-6 pb-6 border-b border-neutral-100">
        <div>
          {product.category?.name && (
            <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400 font-normal mb-1.5">
              {product.category.name}
            </p>
          )}
          {/* BIGGER HIGH-FASHION SERIF TITLE */}
          <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.12] text-neutral-900 tracking-normal">
            {product.name}
          </h1>
        </div>

        {/* PRICE ALIGNED ON TOP RIGHT */}
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

      {/* =====================================================
          COLOR SELECTION
      ====================================================== */}
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

      {/* =====================================================
          SIZE SELECTION (KHAITE HORIZONTAL MINIMAL RAIL)
      ====================================================== */}
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

          {/* Minimalist size list */}
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
                    ${isUnavailable ? "line-through opacity-30 cursor-not-allowed" : ""}
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

      {/* =====================================================
          EDITORIAL DESCRIPTION & SKU
      ====================================================== */}
      <div className="pt-2 pb-6">
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700 tracking-wide font-normal">
          {product.description ||
            "A masterfully tailored piece cut for fluid movement and understated luxury. Designed for effortless grace and timeless sophistication."}
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
          SKU: {selectedVariant?.sku || product.slug}
        </p>
      </div>

      {/* =====================================================
          PRIMARY ACTION: ADD TO CART
      ====================================================== */}
      <div className="pt-2 pb-5 space-y-3">
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

      {/* =====================================================
          BOUTIQUE SERVICE / FIND IN STORE
      ====================================================== */}
      <div className="flex items-center gap-2 pt-1 pb-6 text-xs tracking-wider uppercase text-neutral-600">
        <MapPin size={13} strokeWidth={1.5} />
        <span>Complimentary Express Shipping & Returns</span>
      </div>

      {/* =====================================================
          MINIMALIST HAIRLINE ACCORDIONS (KHAITE STYLE)
      ====================================================== */}
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
              <p>Designed for a relaxed, elegant silhouette that drapes naturally.</p>
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
            <div className="mt-3 text-xs leading-relaxed text-neutral-600 space-y-2">
              <p>Complimentary express worldwide delivery on all orders.</p>
              <p>Enjoy 14-day hassle-free returns on unworn items with tags attached.</p>
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
                <p className="text-xs text-neutral-500">No reviews yet for this garment.</p>
              ) : (
                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="border-b border-neutral-100 pb-3 text-xs">
                      <div className="flex items-center justify-between font-medium text-black">
                        <span>{rev.userName || "Verified Client"}</span>
                        <span>{rev.rating} / 5</span>
                      </div>
                      <p className="mt-1 text-neutral-600">{rev.comment}</p>
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
                        { productId: product.id, title, rating, comment },
                        { onSuccess: () => setShowReviewForm(false) }
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