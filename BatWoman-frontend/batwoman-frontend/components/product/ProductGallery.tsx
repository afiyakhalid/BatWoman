"use client";

import { useState } from "react";
import Image from "next/image";

import { ProductMedia } from "@/types/product-detail";

interface ProductGalleryProps {
    media: ProductMedia[];
}

export default function ProductGallery({
                                           media,
                                       }: ProductGalleryProps) {

    const [selectedMedia, setSelectedMedia] = useState(0);

    if (!media || media.length === 0) {
        return (
            <div className="flex aspect-[3/4] w-full max-w-[520px] items-center justify-center border border-neutral-200">
                <span className="text-neutral-500">
                    No Media Available
                </span>
            </div>
        );
    }

    return (
        <div className="flex gap-6">

            {/* Thumbnails */}

            <div className="flex flex-col gap-4">

                {media.map((item, index) => (

                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedMedia(index)}
                        className={`
                            relative
                            h-28
                            w-20
                            overflow-hidden
                            border
                            ${
                            selectedMedia === index
                                ? "border-black"
                                : "border-neutral-200"
                        }
                        `}
                    >

                        {item.mediaType === "IMAGE" ? (

                            <Image
                                src={item.mediaUrl}
                                alt={item.altText || "Product image"}
                                fill
                                sizes="80px"
                                className="object-cover"
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

                ))}

            </div>

            {/* Main Media */}

            <div className="relative aspect-[3/4] w-full max-w-[520px]">

                {media[selectedMedia].mediaType === "IMAGE" ? (

                    <Image
                        src={media[selectedMedia].mediaUrl}
                        alt={
                            media[selectedMedia].altText ||
                            "Product image"
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 520px"
                        priority
                        className="object-cover"
                    />

                ) : (

                    <video
                        src={media[selectedMedia].mediaUrl}
                        controls
                        className="h-full w-full object-cover"
                        playsInline
                    />

                )}

            </div>

        </div>
    );
}