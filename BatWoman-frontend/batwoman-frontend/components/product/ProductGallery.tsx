"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductMedia } from "@/types/product-detail";

interface ProductGalleryProps {
  media: ProductMedia[];
}

export default function ProductGallery({ media = [] }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // If no media at all, show empty fallback
  if (!media || media.length === 0) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center bg-[#f6f6f6] rounded-none border border-neutral-200">
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">
          No Media Available
        </span>
      </div>
    );
  }

  const hasMultipleMedia = media.length > 1;
  const safeIndex = selectedIndex < media.length ? selectedIndex : 0;
  const activeMedia = media[safeIndex] || media[0];

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start w-full">
      {/* =========================================================
          SQUARE BOXES ON THE SIDE: ONLY IF ADMIN ADDED > 1 IMAGE
      ========================================================== */}
      {hasMultipleMedia && (
        <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-y-auto no-scrollbar w-full sm:w-auto">
          {media.map((item, index) => {
            const isSelected = safeIndex === index;

            return (
              <button
                key={item.id || index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`
                  relative aspect-square w-18 h-18 sm:w-22 sm:h-22 shrink-0 overflow-hidden bg-[#f6f6f6] rounded-none transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "border-2 border-black opacity-100"
                      : "border border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-500"
                  }
                `}
                aria-label={`Select product image view ${index + 1}`}
              >
                {item.mediaType === "IMAGE" ? (
                  <Image
                    src={item.mediaUrl}
                    alt={item.altText || `Thumbnail ${index + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                  />
                ) : (
                  <video
                    src={item.mediaUrl}
                    className="h-full w-full object-cover"
                    muted
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* =========================================================
          MAIN PRODUCT IMAGE (CHANGES WHEN SIDE BOX IS CLICKED)
      ========================================================== */}
      <div className="relative aspect-[3/4] w-full flex-1 overflow-hidden bg-[#f6f6f6] rounded-none">
        {activeMedia.mediaType === "IMAGE" ? (
          <Image
            src={activeMedia.mediaUrl}
            alt={activeMedia.altText || "Selected product view"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 850px"
            className="object-cover object-top transition-opacity duration-300"
          />
        ) : (
          <video
            src={activeMedia.mediaUrl}
            className="h-full w-full object-cover object-top"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>
    </div>
  );
}