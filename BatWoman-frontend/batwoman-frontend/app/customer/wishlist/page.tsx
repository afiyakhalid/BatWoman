"use client";

import Link from "next/link";
import { Heart, Loader2, ShoppingBag, Trash2 } from "lucide-react";

import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
  const {
    data: wishlist = [],
    isLoading,
    isError,
    removeFromWishlist,
    isRemoving,
  } = useWishlist();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2
            className="animate-spin text-neutral-500"
            size={28}
          />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <Heart
            size={40}
            strokeWidth={1.5}
            className="mb-4 text-neutral-400"
          />

          <h1 className="text-xl font-medium text-neutral-900">
            Unable to load your wishlist
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Please try again.
          </p>
        </div>
      </main>
    );
  }

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <Heart
              size={28}
              strokeWidth={1.5}
              className="text-neutral-500"
            />
          </div>

          <h1 className="text-2xl font-medium text-neutral-900">
            Your wishlist is empty
          </h1>

          <p className="mt-2 max-w-md text-sm text-neutral-500">
            Save pieces you love here and come back to them whenever
            you're ready.
          </p>

          <Link
            href="/customer/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-7 py-3 text-sm font-medium text-neutral-800 transition-colors duration-200 hover:bg-neutral-200"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 lg:py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Saved for later
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-neutral-500">
                {wishlist.length}{" "}
                {wishlist.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {wishlist.map((item) => {
            const product = item.product;

            const primaryImage =
              product.media?.find(
                (media) => media.primaryMedia
              ) ?? product.media?.[0];

            const hoverImage =
              product.media?.[1] ?? primaryImage;

            return (
              <div key={item.id} className="group">

                <Link
                  href={`/customer/products/${product.slug}`}
                  className="block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">

                    {primaryImage && (
                      <img
                        src={primaryImage.mediaUrl}
                        alt={
                          primaryImage.altText ||
                          product.name
                        }
                        className="h-full w-full object-cover transition-opacity duration-300"
                      />
                    )}

                    {hoverImage &&
                      hoverImage.id !== primaryImage?.id && (
                        <img
                          src={hoverImage.mediaUrl}
                          alt={
                            hoverImage.altText ||
                            product.name
                          }
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}

                    {/* Remove */}
                    <button
                      type="button"
                      disabled={isRemoving}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        removeFromWishlist(product.id);
                      }}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2
                        size={17}
                        strokeWidth={1.7}
                      />
                    </button>
                  </div>
                </Link>

                {/* Product information */}
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-neutral-500">
                    {product.active
                      ? "Available"
                      : "Unavailable"}
                  </p>

                  <Link
                    href={`/customer/products/${product.slug}`}
                  >
                    <h2 className="mt-1 text-sm font-medium text-neutral-900 hover:underline">
                      {product.name}
                    </h2>
                  </Link>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-900">
                      ₹
                      {product.discountPrice ??
                        product.price}
                    </span>

                    {product.discountPrice !== null && (
                      <span className="text-sm text-neutral-400 line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </div>

                  {!product.active && (
                    <p className="mt-2 text-xs text-neutral-500">
                      Currently unavailable
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}