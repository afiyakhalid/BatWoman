"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {

  const primaryImage =
    product.images.find((image) => image.primary) ??
    product.images[0];

  const hoverImage =
    product.images[1] ??
    primaryImage;

  return (

    <Link
      href={`/customer/products/${product.slug}`}
      className="group block"
    >

      {/* IMAGE */}

      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">

        <Image
          src={primaryImage.objectKey}
          alt={primaryImage.altText}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="
            object-cover
            transition-opacity
            duration-500
            group-hover:opacity-0
          "
        />

        <Image
          src={hoverImage.objectKey}
          alt={hoverImage.altText}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="
            object-cover
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* Wishlist */}

        <button
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
          "
        >
          <Heart size={18} />
        </button>

      </div>

      {/* CONTENT */}

      <div className="mt-5">

        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          {product.category.name}
        </p>

        <h3 className="mt-2 font-medium text-lg transition-colors group-hover:text-neutral-600">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-3">

          {product.discountPrice ? (
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