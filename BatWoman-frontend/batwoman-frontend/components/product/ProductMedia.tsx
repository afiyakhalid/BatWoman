"use client";

interface ProductMediaProps {
    mediaType: string;
    mediaUrl: string;
    altText?: string | null;
    className?: string;
}

export default function ProductMedia({
                                         mediaType,
                                         mediaUrl,
                                         altText,
                                         className = "",
                                     }: ProductMediaProps) {

    const isVideo =
        mediaType?.toUpperCase() === "VIDEO";

    if (isVideo) {
        return (
            <video
                src={mediaUrl}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className={className}
            />
        );
    }

    return (
        <img
            src={mediaUrl}
            alt={altText || "Product image"}
            className={className}
        />
    );
}