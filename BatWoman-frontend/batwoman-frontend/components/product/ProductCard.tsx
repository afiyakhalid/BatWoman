"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Product } from "@/types/product";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuthStore } from "@/store/auth.store";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
                                      product,
                                    }: ProductCardProps) {

  const router = useRouter();

  const { isAuthenticated } = useAuthStore();

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
      product.media?.[1] ?? primaryImage;

  const handleWishlistClick = (
      event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const wishlistLoading = isAdding || isRemoving;

  return (
      <Link
          href={`/customer/products/${product.slug}`}
          className="group block"
      >
        {/* IMAGE */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {primaryImage ? (
              <>
                {/* Primary image */}
                <Image
                    src={primaryImage.mediaUrl}
                    alt={primaryImage.altText || product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="
                object-cover
                transition-opacity
                duration-500
                group-hover:opacity-0
              "
                />

                {/* Hover image */}
                <Image
                    src={hoverImage?.mediaUrl ?? primaryImage.mediaUrl}
                    alt={hoverImage?.altText || product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="
                object-cover
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
                />
              </>
          ) : (
              <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                No image
              </div>
          )}

          {/* Wishlist */}
          <button
              type="button"
              onClick={handleWishlistClick}
              disabled={wishlistLoading}
              className="
            absolute
            right-4
            top-4
            rounded-full
            bg-white/90
            p-2
            backdrop-blur
            transition
            hover:scale-110
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
              aria-label={
                isWishlisted
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
              }
          >
            <Heart
                size={18}
                className={isWishlisted ? "fill-black" : ""}
            />
          </button>
        </div>

        {/* CONTENT */}
        <div className="mt-5">
          {/* Category */}
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            {product.category.name}
          </p>

          {/* Product name */}
          <h3 className="mt-2 text-lg font-medium transition-colors group-hover:text-neutral-600">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-3 flex items-center gap-3">
            {product.discountPrice !== null ? (
                <>
              <span className="font-semibold text-black">
                ₹{product.discountPrice}
              </span>

                  <span className="text-neutral-400 line-through">
                ₹{product.price}
              </span>
                </>
            ) : (
                <span className="font-semibold text-black">
              ₹{product.price}
            </span>
            )}
          </div>
        </div>
      </Link>
  );
}