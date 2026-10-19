"use client";

import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

interface MediaItem {
  id?: string;
  mediaUrl: string;
  altText?: string;
  primaryMedia?: boolean;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number | null;
  active: boolean;
  media?: MediaItem[];
}

interface WishlistItem {
  id: string;
  product: Product;
}

interface WishlistCardProps {
  item: WishlistItem;
  isRemoving: boolean;
  onRemove: (productId: string) => void;
}

export default function WishlistCard({
  item,
  isRemoving,
  onRemove,
}: WishlistCardProps) {
  const { product } = item;

  const primaryImage =
    product.media?.find((media) => media.primaryMedia) ?? product.media?.[0];

  const hoverImage = product.media?.[1] ?? primaryImage;

  return (
    <div className="group flex flex-col justify-between bg-white border border-[#e7e1d8] p-3 sm:p-4 shadow-[0_2px_15px_rgba(45,31,26,0.02)] hover:shadow-[0_8px_30px_rgba(45,31,26,0.06)] transition-all duration-500">
      <div>
        {/* IMAGE CONTAINER */}
        <Link
          href={`/customer/products/${product.slug}`}
          className="relative block aspect-[3/4] overflow-hidden bg-[#f4eee6]"
        >
          {primaryImage ? (
            <img
              src={primaryImage.mediaUrl}
              alt={primaryImage.altText || product.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-[var(--font-playfair)] italic text-neutral-400 text-sm">
              BatWoman Studio
            </div>
          )}

          {hoverImage && hoverImage.id !== primaryImage?.id && (
            <img
              src={hoverImage.mediaUrl}
              alt={hoverImage.altText || product.name}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            />
          )}

          {/* STATUS RIBBON */}
          <span
            className={`absolute left-3 top-3 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] border backdrop-blur-sm ${
              product.active
                ? "bg-[#faf8f5]/90 border-[#e7e1d8] text-[#8C6D4F]"
                : "bg-neutral-900/90 border-neutral-800 text-neutral-300"
            }`}
          >
            {product.active ? "Available" : "Archive"}
          </span>

          {/* REMOVE BUTTON */}
          <button
            type="button"
            disabled={isRemoving}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(product.id);
            }}
            aria-label={`Remove ${product.name} from wishlist`}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-[#e7e1d8] bg-white/90 text-neutral-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-black hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={13} strokeWidth={1.75} />
          </button>
        </Link>

        {/* METADATA */}
        <div className="mt-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D4F] font-medium">
            Atelier Edition
          </p>

          <Link
            href={`/customer/products/${product.slug}`}
            className="block group-hover:underline"
          >
            <h3 className="font-[var(--font-playfair)] text-base font-normal text-neutral-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-baseline gap-2.5">
            <span className="text-sm font-medium text-neutral-900">
              ₹{(product.discountPrice ?? product.price).toLocaleString("en-IN")}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTION CTA: Clean Khaite Outline Button (Not filled in black) */}
      <div className="mt-5 pt-3 border-t border-[#f0eae1]">
        <Link
          href={`/customer/products/${product.slug}`}
          className="flex w-full items-center justify-center gap-2 border border-neutral-900 bg-transparent py-3 text-[10px] uppercase tracking-[0.22em] font-medium text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white rounded-none"
        >
          <span>View Abaya</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
