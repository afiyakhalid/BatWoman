"use client";

import { useState } from "react";

import Image from "next/image";

import { ProductImage } from "@/types/product-detail";

interface ProductGalleryProps {

    images: ProductImage[];

}

export default function ProductGallery({

    images,

}: ProductGalleryProps) {

    const [selectedImage, setSelectedImage] = useState(0);

    return (

        <div className="flex gap-6">

            {/* Thumbnails */}

            <div className="flex flex-col gap-4">

                {images.map((image, index) => (

                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`
                        relative
                        h-28
                        w-20
                        overflow-hidden
                        border
                        ${selectedImage === index
                                ? "border-black"
                                : "border-neutral-200"}
                        `}
                    >

                        <Image
                            src={image.objectKey}
                            alt={image.altText}
                            fill
                            className="object-cover"
                        />

                    </button>

                ))}

            </div>

            {/* Main Image */}

            <div className="relative aspect-[3/4] flex-1">

                <Image
                    src={images[selectedImage].objectKey}
                    alt={images[selectedImage].altText}
                    fill
                    priority
                    className="object-cover"
                />

            </div>

        </div>

    );

}