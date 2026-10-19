"use client";

import { useState } from "react";
import { ProductMedia } from "@/types/product-detail";

interface ProductGalleryProps {
    media: ProductMedia[];
}

export default function ProductGallery({
                                           media = [],
                                       }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // If no media is available, show the existing fallback.
    if (!media || media.length === 0) {
        return (
            <div className="flex aspect-[3/4] w-full items-center justify-center rounded-none border border-neutral-200 bg-[#f6f6f6]">
        <span className="text-xs font-light uppercase tracking-[0.25em] text-neutral-400">
          No Media Available
        </span>
            </div>
        );
    }

    const hasMultipleMedia = media.length > 1;
    const safeIndex = selectedIndex < media.length ? selectedIndex : 0;
    const activeMedia = media[safeIndex] || media[0];

    return (
        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:gap-6">
            {/* Side thumbnails: displayed only when multiple media items exist. */}
            {hasMultipleMedia && (
                <div className="no-scrollbar flex w-full shrink-0 gap-3 overflow-x-auto sm:w-auto sm:flex-col sm:overflow-y-auto">
                    {media.map((item, index) => {
                        const isSelected = safeIndex === index;

                        return (
                            <button
                                key={item.id || index}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                className={`relative h-[72px] w-[72px] shrink-0 cursor-pointer overflow-hidden rounded-none bg-[#f6f6f6] transition-all duration-200 sm:h-[88px] sm:w-[88px] ${
                                    isSelected
                                        ? "border-2 border-black opacity-100"
                                        : "border border-neutral-200 opacity-60 hover:border-neutral-500 hover:opacity-100"
                                }`}
                                aria-label={`Select product image view ${index + 1}`}
                                aria-pressed={isSelected}
                            >
                                {item.mediaType === "IMAGE" ? (
                                    <img
                                        src={item.mediaUrl}
                                        alt={item.altText || `Thumbnail ${index + 1}`}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover object-top"
                                    />
                                ) : (
                                    <video
                                        src={item.mediaUrl}
                                        className="h-full w-full object-cover"
                                        muted
                                        playsInline
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Main product media. Use the supplied URL directly. */}
            <div className="relative aspect-[3/4] w-full flex-1 overflow-hidden rounded-none bg-[#f6f6f6]">
                {activeMedia.mediaType === "IMAGE" ? (
                    <img
                        src={activeMedia.mediaUrl}
                        alt={activeMedia.altText || "Selected product view"}
                        fetchPriority="high"
                        className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300"
                    />
                ) : (
                    <video
                        src={activeMedia.mediaUrl}
                        className="absolute inset-0 h-full w-full object-cover object-top"
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