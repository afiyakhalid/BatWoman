"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Button,
} from "@/components/ui/button";

import {
    ProductMedia,
    deleteProductMedia,
    getProductById,
    setPrimaryProductMedia,
    uploadProductMedia,
} from "@/services/adminProduct.service";

interface ProductMediaUploaderProps {
    productId: string;
    existingMedia?: ProductMedia[];
    onUploadComplete?: () => void;
    onMediaChanged?: (media: ProductMedia[]) => void;
}

export default function ProductMediaUploader({
                                                 productId,
                                                 existingMedia = [],
                                                 onUploadComplete,
                                                 onMediaChanged,
                                             }: ProductMediaUploaderProps) {
    const [media, setMedia] = useState<ProductMedia[]>(
        existingMedia
    );

    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [primaryId, setPrimaryId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMedia(existingMedia);
    }, [existingMedia]);

    const previews = useMemo(
        () =>
            files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
                isImage: file.type.startsWith("image/"),
                isVideo: file.type.startsWith("video/"),
            })),
        [files]
    );

    useEffect(() => {
        return () => {
            previews.forEach((preview) => {
                URL.revokeObjectURL(preview.url);
            });
        };
    }, [previews]);

    async function refreshMedia() {
        const product = await getProductById(productId);
        const updatedMedia = product.media ?? [];

        setMedia(updatedMedia);
        onMediaChanged?.(updatedMedia);
    }

    function handleFileSelection(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const selectedFiles = event.target.files
            ? Array.from(event.target.files)
            : [];

        if (selectedFiles.length === 0) {
            return;
        }

        setFiles((previous) => [
            ...previous,
            ...selectedFiles,
        ]);

        setError(null);
        event.target.value = "";
    }

    function removePendingFile(index: number) {
        setFiles((previous) =>
            previous.filter((_, fileIndex) => fileIndex !== index)
        );
    }

    async function handleUpload() {
        if (files.length === 0 || uploading) {
            return;
        }

        setUploading(true);
        setError(null);

        try {
            await uploadProductMedia(productId, files);

            setFiles([]);
            await refreshMedia();
            onUploadComplete?.();
        } catch (uploadError) {
            console.error(
                "Failed to upload product media.",
                uploadError
            );

            setError(
                "Failed to upload media. Please try again."
            );
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete(mediaItem: ProductMedia) {
        if (deletingId || !mediaItem.id) {
            return;
        }

        const confirmed = window.confirm(
            "Delete this media file?"
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(mediaItem.id);
        setError(null);

        try {
            await deleteProductMedia(productId, mediaItem.id);
            await refreshMedia();
        } catch (deleteError) {
            console.error(
                "Failed to delete product media.",
                deleteError
            );

            setError(
                "Failed to delete media. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    }

    async function handleSetPrimary(mediaItem: ProductMedia) {
        if (primaryId || mediaItem.primaryMedia) {
            return;
        }

        setPrimaryId(mediaItem.id);
        setError(null);

        try {
            await setPrimaryProductMedia(
                productId,
                mediaItem.id
            );

            await refreshMedia();
        } catch (primaryError) {
            console.error(
                "Failed to set primary media.",
                primaryError
            );

            setError("Failed to set primary media.");
        } finally {
            setPrimaryId(null);
        }
    }

    const sortedMedia = media
        .slice()
        .sort((a, b) => a.displayOrder - b.displayOrder);

    return (
        <div className="min-w-0 space-y-6 sm:space-y-8">
            {/* Upload section */}
            <section className="overflow-hidden rounded-2xl border border-[#E7DED1] bg-[#FFFDFA] shadow-[0_4px_24px_rgba(62,45,29,0.04)]">
                <div className="border-b border-[#EDE5DA] px-4 py-5 sm:px-6 sm:py-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A58A60]">
                        Product management
                    </span>

                    <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-[#302820] sm:text-3xl">
                        Product Media
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#82776B]">
                        Upload and manage the imagery and videos
                        that represent this product in your storefront.
                    </p>
                </div>

                <div className="space-y-5 p-4 sm:p-6">
                    <label
                        htmlFor="product-media-files"
                        className="block text-sm font-medium text-[#514538]"
                    >
                        Choose images or videos
                    </label>

                    <input
                        id="product-media-files"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileSelection}
                        disabled={uploading}
                        className="block w-full min-w-0 cursor-pointer rounded-xl border border-[#DED3C4] bg-[#FAF7F2] text-sm text-[#514538] file:mr-3 file:cursor-pointer file:border-0 file:border-r file:border-[#DED3C4] file:bg-[#EDE4D7] file:px-4 file:py-3 file:text-xs file:font-semibold file:text-[#514538] hover:border-[#B69A6A] focus:outline-none focus:ring-2 focus:ring-[#B69A6A]/30 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <p className="text-xs leading-5 text-[#918579]">
                        You can select multiple files. Review the
                        previews before uploading them.
                    </p>

                    {previews.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-sm font-semibold text-[#514538]">
                                    Pending uploads
                                </h3>

                                <span className="text-xs text-[#918579]">
                                    {previews.length}{" "}
                                    {previews.length === 1
                                        ? "file"
                                        : "files"}{" "}
                                    selected
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {previews.map((preview, index) => (
                                    <div
                                        key={`${preview.file.name}-${preview.file.lastModified}-${index}`}
                                        className="min-w-0 overflow-hidden rounded-xl border border-[#E7DED1] bg-white"
                                    >
                                        {preview.isImage ? (
                                            <img
                                                src={preview.url}
                                                alt={preview.file.name}
                                                className="aspect-[3/4] w-full bg-[#F4EFE7] object-cover"
                                            />
                                        ) : preview.isVideo ? (
                                            <video
                                                src={preview.url}
                                                controls
                                                preload="metadata"
                                                className="aspect-[3/4] w-full bg-[#F4EFE7] object-cover"
                                            />
                                        ) : (
                                            <div className="flex aspect-[3/4] items-center justify-center bg-[#F4EFE7] p-3 text-center text-xs text-[#82776B]">
                                                Unsupported preview
                                            </div>
                                        )}

                                        <div className="space-y-2 p-2.5 sm:p-3">
                                            <p
                                                title={preview.file.name}
                                                className="truncate text-xs text-[#514538]"
                                            >
                                                {preview.file.name}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removePendingFile(index)
                                                }
                                                disabled={uploading}
                                                className="min-h-9 w-full rounded-lg border border-[#E7DED1] px-3 text-xs font-medium text-[#8B554A] transition hover:border-[#CBA99D] hover:bg-[#FBF2EF] disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 border-t border-[#EDE5DA] pt-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-[#82776B]">
                                    {uploading
                                        ? "Please keep this page open while uploading."
                                        : "Selected files have not been uploaded yet."}
                                </p>

                                <Button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={
                                        uploading ||
                                        files.length === 0
                                    }
                                    className="w-full rounded-xl bg-[#4B3B2B] px-6 text-white hover:bg-[#36291F] sm:w-auto"
                                >
                                    {uploading
                                        ? "Uploading..."
                                        : `Upload ${files.length} ${
                                            files.length === 1
                                                ? "File"
                                                : "Files"
                                        }`}
                                </Button>
                            </div>
                        </div>
                    )}

                    {previews.length === 0 && (
                        <div className="rounded-xl border border-dashed border-[#DCCDBA] bg-[#FAF7F2] px-4 py-7 text-center sm:py-9">
                            <p className="font-[var(--font-playfair)] text-lg text-[#514538]">
                                Ready for its close-up
                            </p>

                            <p className="mt-1 text-sm text-[#918579]">
                                Select files above to preview them here.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Existing media section */}
            <section className="overflow-hidden rounded-2xl border border-[#E7DED1] bg-[#FFFDFA] shadow-[0_4px_24px_rgba(62,45,29,0.04)]">
                <div className="border-b border-[#EDE5DA] px-4 py-5 sm:px-6 sm:py-6">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A58A60]">
                        Storefront assets
                    </span>

                    <h3 className="mt-2 font-[var(--font-playfair)] text-2xl text-[#302820] sm:text-3xl">
                        Existing Media
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#82776B]">
                        Choose the primary product image or remove
                        media that is no longer needed.
                    </p>
                </div>

                <div className="p-4 sm:p-6">
                    {sortedMedia.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#DCCDBA] bg-[#FAF7F2] px-4 py-10 text-center">
                            <p className="font-[var(--font-playfair)] text-xl text-[#514538]">
                                No media uploaded yet
                            </p>

                            <p className="mt-2 text-sm text-[#918579]">
                                Upload an image or video to begin
                                building this product&apos;s gallery.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                            {sortedMedia.map((item) => (
                                <article
                                    key={item.id}
                                    className="group min-w-0 overflow-hidden rounded-xl border border-[#E7DED1] bg-white transition duration-200 hover:border-[#C8B28E] hover:shadow-[0_8px_24px_rgba(62,45,29,0.08)]"
                                >
                                    <div className="relative overflow-hidden bg-[#F4EFE7]">
                                        {item.mediaType === "IMAGE" ? (
                                            <img
                                                src={item.mediaUrl}
                                                alt={
                                                    item.altText ??
                                                    "Product media"
                                                }
                                                loading="lazy"
                                                className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                            />
                                        ) : (
                                            <video
                                                src={item.mediaUrl}
                                                controls
                                                preload="metadata"
                                                className="aspect-[3/4] w-full object-cover"
                                            />
                                        )}

                                        {item.primaryMedia && (
                                            <span className="absolute left-2 top-2 rounded-full border border-[#D8C39D]/70 bg-[#F7F0E3]/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6E5737] shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:text-[11px]">
                                                Primary
                                            </span>
                                        )}

                                        <span className="absolute bottom-2 right-2 rounded-md bg-[#29241F]/75 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                                            {item.mediaType === "IMAGE"
                                                ? "Image"
                                                : "Video"}
                                        </span>
                                    </div>

                                    <div className="space-y-3 p-2.5 sm:p-3.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-xs text-[#82776B]">
                                                Display order
                                            </span>

                                            <span className="rounded-md bg-[#F4EFE7] px-2 py-1 text-xs font-semibold tabular-nums text-[#514538]">
                                                {item.displayOrder}
                                            </span>
                                        </div>

                                        {!item.primaryMedia && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="min-h-9 w-full rounded-lg border-[#DCCDBA] bg-white px-2 text-xs text-[#514538] hover:border-[#B69A6A] hover:bg-[#FAF7F2] sm:text-sm"
                                                disabled={
                                                    primaryId !== null
                                                }
                                                onClick={() =>
                                                    handleSetPrimary(item)
                                                }
                                            >
                                                {primaryId === item.id
                                                    ? "Updating..."
                                                    : "Set as Primary"}
                                            </Button>
                                        )}

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            className="min-h-9 w-full rounded-lg px-2 text-xs sm:text-sm"
                                            disabled={
                                                deletingId !== null
                                            }
                                            onClick={() =>
                                                handleDelete(item)
                                            }
                                        >
                                            {deletingId === item.id
                                                ? "Deleting..."
                                                : "Delete Media"}
                                        </Button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {error && (
                <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                    {error}
                </div>
            )}
        </div>
    );
}