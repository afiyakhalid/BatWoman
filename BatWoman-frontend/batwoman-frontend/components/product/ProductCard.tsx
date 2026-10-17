"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";

import { Product } from "@/types/product";
import { useWishlist } from "@/hooks/useWishlist";
import { useRequireAuth } from "@/hooks/useRequireAuth";

interface ProductCardProps {
  product: Product;
  editorialMode?: boolean;
}

export default function ProductCard({
  product,
  editorialMode = false,
}: ProductCardProps) {
  const requireAuth = useRequireAuth();
  const [isHovered, setIsHovered] = useState(false);

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

  const primaryImage =
    product.media?.find((media) => media.primaryMedia) ??
    product.media?.[0];

  const hoverImage =
    product.media?.find((media) => !media.primaryMedia) ??
    product.media?.[1] ??
    primaryImage;

  const handleWishlistClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    requireAuth(() => {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product.id);
      }
    });
  };

  const wishlistLoading = isAdding || isRemoving;

  return (
    <Link
      href={`/customer/products/${product.slug}`}
      className="group block rounded-none text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTAINER - KHAITE EDITORIAL ASPECT RATIO & HOVER CROSSFADE */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f6f6f6] rounded-none">
        {primaryImage ? (
          <>
            {/* Primary image */}
            <Image
              src={primaryImage.mediaUrl}
              alt={primaryImage.altText || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`
                object-cover object-top
                transition-opacity duration-700 ease-out
                ${isHovered && hoverImage?.mediaUrl !== primaryImage.mediaUrl ? "opacity-0" : "opacity-100"}
              `}
              priority={false}
            />

            {/* Hover image (Back / Angle shot) */}
            {hoverImage && hoverImage.mediaUrl !== primaryImage.mediaUrl && (
              <Image
                src={hoverImage.mediaUrl}
                alt={hoverImage.altText || product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`
                  object-cover object-top
                  transition-opacity duration-700 ease-out
                  ${isHovered ? "opacity-100" : "opacity-0"}
                `}
                priority={false}
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] tracking-widest text-neutral-400 uppercase">
            Zubayda
          </div>
        )}

        {/* MINIMALIST WISHLIST ICON - TOP RIGHT, UNCLUTTERED & TOUCH FRIENDLY */}
        <button
          type="button"
          onClick={handleWishlistClick}
          disabled={wishlistLoading}
          className="
            absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10
            p-2 text-neutral-800
            transition-all duration-300
            hover:scale-110 active:scale-90
            focus:outline-none
            disabled:opacity-50
          "
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart
            size={16}
            strokeWidth={1.25}
            className={`
              transition-colors duration-200
              ${
                isWishlisted
                  ? "fill-black text-black"
                  : "text-neutral-700 hover:text-black opacity-80 group-hover:opacity-100"
              }
            `}
          />
        </button>

        {/* KHAITE-STYLE QUICK SIZE BAR ON HOVER (DESKTOP) */}
        <div
          className={`
            hidden sm:flex
            absolute inset-x-0 bottom-0 z-10
            bg-white/95 backdrop-blur-xs
            py-2.5 px-3
            border-t border-neutral-100
            transition-all duration-300 ease-out
            items-center justify-between
            ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
          `}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
            Sizes
          </span>
          <div className="flex items-center gap-2.5 text-[10px] tracking-[0.15em] text-neutral-800 font-medium uppercase">
            <span className="hover:text-black transition-colors">XS</span>
            <span className="hover:text-black transition-colors">S</span>
            <span className="hover:text-black transition-colors">M</span>
            <span className="hover:text-black transition-colors">L</span>
            <span className="hover:text-black transition-colors">XL</span>
          </div>
        </div>
      </div>

      {/* PRODUCT METADATA - HIGH-FASHION MINIMALIST TYPOGRAPHY */}
      <div className={`mt-4 sm:mt-5 space-y-1 ${editorialMode ? "max-w-md" : ""}`}>
        {/* Category tag */}
        {product.category?.name && (
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-neutral-400 font-normal">
            {product.category.name}
          </p>
        )}

        {/* Product Name */}
        <h3 className="text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] text-neutral-900 font-normal transition-colors group-hover:text-neutral-500 line-clamp-1">
          {product.name}
        </h3>

        {/* Price Display */}
        <div className="flex items-baseline gap-2 pt-0.5">
          {product.discountPrice !== null ? (
            <>
              <span className="text-[11px] sm:text-xs font-normal tracking-[0.1em] text-black">
                ₹{product.discountPrice.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-[11px] font-normal tracking-[0.08em] text-neutral-400 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-[11px] sm:text-xs font-normal tracking-[0.1em] text-neutral-900">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}