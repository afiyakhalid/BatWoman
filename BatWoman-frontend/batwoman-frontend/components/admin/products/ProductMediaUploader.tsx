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

    onMediaChanged?: (
        media: ProductMedia[]
    ) => void;

}

export default function ProductMediaUploader({

                                                 productId,

                                                 existingMedia = [],

                                                 onUploadComplete,

                                                 onMediaChanged,

                                             }: ProductMediaUploaderProps) {

    const [media, setMedia] =
        useState<ProductMedia[]>(
            existingMedia
        );

    const [files, setFiles] =
        useState<File[]>([]);

    const [uploading, setUploading] =
        useState(false);

    const [deletingId, setDeletingId] =
        useState<string | null>(null);

    const [primaryId, setPrimaryId] =
        useState<string | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

        setMedia(
            existingMedia
        );

    }, [existingMedia]);

    const previews = useMemo(
        () => {

            return files.map(
                (file) => ({
                    file,
                    url:
                        URL.createObjectURL(
                            file
                        ),
                    isImage:
                        file.type.startsWith(
                            "image/"
                        ),
                    isVideo:
                        file.type.startsWith(
                            "video/"
                        ),
                })
            );

        },
        [files]
    );

    async function refreshMedia() {

        const product =
            await getProductById(
                productId
            );

        setMedia(
            product.media ?? []
        );

        onMediaChanged?.(
            product.media ?? []
        );
    }

    function handleFileSelection(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const selectedFiles =
            event.target.files
                ? Array.from(
                    event.target.files
                )
                : [];

        if (
            selectedFiles.length === 0
        ) {

            return;

        }

        setFiles(
            (previous) => [
                ...previous,
                ...selectedFiles,
            ]
        );

        event.target.value = "";
    }

    function removePendingFile(
        index: number
    ) {

        setFiles(
            (previous) =>
                previous.filter(
                    (_, i) =>
                        i !== index
                )
        );
    }

    async function handleUpload() {

        if (
            files.length === 0 ||
            uploading
        ) {

            return;

        }

        setUploading(true);
        setError(null);

        try {

            await uploadProductMedia(
                productId,
                files
            );

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

    async function handleDelete(
        mediaItem: ProductMedia
    ) {

        if (
            deletingId ||
            !mediaItem.id
        ) {

            return;

        }

        const confirmed =
            window.confirm(
                "Delete this media file?"
            );

        if (!confirmed) {

            return;

        }

        setDeletingId(
            mediaItem.id
        );

        setError(null);

        try {

            await deleteProductMedia(
                productId,
                mediaItem.id
            );

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

    async function handleSetPrimary(
        mediaItem: ProductMedia
    ) {

        if (
            primaryId ||
            mediaItem.primaryMedia
        ) {

            return;

        }

        setPrimaryId(
            mediaItem.id
        );

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

            setError(
                "Failed to set primary media."
            );

        } finally {

            setPrimaryId(null);

        }
    }

    return (

        <div className="space-y-8">

            {/* =====================================================
                UPLOAD
            ====================================================== */}

            <section className="rounded-xl border bg-white p-6">

                <div className="mb-5">

                    <h2 className="text-xl font-semibold">
                        Product Media
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Upload product images or videos.
                    </p>

                </div>

                <div className="space-y-4">

                    <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={
                            handleFileSelection
                        }
                        disabled={
                            uploading
                        }
                        className="
                            block
                            w-full
                            cursor-pointer
                            rounded-md
                            border
                            border-input
                            bg-background
                            p-3
                            text-sm
                        "
                    />

                    {previews.length > 0 && (

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                            {previews.map(
                                (
                                    preview,
                                    index
                                ) => (

                                    <div
                                        key={`${preview.file.name}-${index}`}
                                        className="
                                            overflow-hidden
                                            rounded-lg
                                            border
                                        "
                                    >

                                        {preview.isImage && (

                                            <img
                                                src={
                                                    preview.url
                                                }
                                                alt={
                                                    preview.file.name
                                                }
                                                className="
                                                    h-40
                                                    w-full
                                                    object-cover
                                                "
                                            />

                                        )}

                                        {preview.isVideo && (

                                            <video
                                                src={
                                                    preview.url
                                                }
                                                controls
                                                className="
                                                    h-40
                                                    w-full
                                                    object-cover
                                                "
                                            />

                                        )}

                                        <div className="flex items-center justify-between gap-2 p-2">

                                            <span className="min-w-0 truncate text-xs">
                                                {
                                                    preview.file.name
                                                }
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removePendingFile(
                                                        index
                                                    )
                                                }
                                                className="text-xs text-red-600"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                    <div className="flex justify-end">

                        <Button
                            type="button"
                            onClick={
                                handleUpload
                            }
                            disabled={
                                uploading ||
                                files.length === 0
                            }
                        >
                            {uploading
                                ? "Uploading..."
                                : "Upload Media"}
                        </Button>

                    </div>

                </div>

            </section>

            {/* =====================================================
                EXISTING MEDIA
            ====================================================== */}

            <section className="rounded-xl border bg-white p-6">

                <div className="mb-5">

                    <h3 className="text-lg font-semibold">
                        Existing Media
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage the images and videos already
                        attached to this product.
                    </p>

                </div>

                {media.length === 0 ? (

                    <div className="rounded-lg border border-dashed p-8 text-center">

                        <p className="text-sm text-muted-foreground">
                            No product media uploaded yet.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

                        {media
                            .slice()
                            .sort(
                                (
                                    a,
                                    b
                                ) =>
                                    a.displayOrder -
                                    b.displayOrder
                            )
                            .map(
                                (item) => (

                                    <div
                                        key={
                                            item.id
                                        }
                                        className="
                                            overflow-hidden
                                            rounded-xl
                                            border
                                        "
                                    >

                                        <div className="relative">

                                            {item.mediaType ===
                                            "IMAGE" ? (

                                                <img
                                                    src={
                                                        item.mediaUrl
                                                    }
                                                    alt={
                                                        item.altText ??
                                                        "Product media"
                                                    }
                                                    className="
                                                        h-56
                                                        w-full
                                                        object-cover
                                                    "
                                                />

                                            ) : (

                                                <video
                                                    src={
                                                        item.mediaUrl
                                                    }
                                                    controls
                                                    className="
                                                        h-56
                                                        w-full
                                                        object-cover
                                                    "
                                                />

                                            )}

                                            {item.primaryMedia && (

                                                <span className="
                                                    absolute
                                                    left-2
                                                    top-2
                                                    rounded-full
                                                    bg-black
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    text-white
                                                ">
                                                    Primary
                                                </span>

                                            )}

                                        </div>

                                        <div className="space-y-2 p-3">

                                            <div className="text-xs text-muted-foreground">

                                                Order:{" "}
                                                {
                                                    item.displayOrder
                                                }

                                            </div>

                                            {!item.primaryMedia && (

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="w-full"
                                                    disabled={
                                                        primaryId ===
                                                        item.id
                                                    }
                                                    onClick={() =>
                                                        handleSetPrimary(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {primaryId ===
                                                    item.id
                                                        ? "Updating..."
                                                        : "Set Primary"}
                                                </Button>

                                            )}

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                className="w-full"
                                                disabled={
                                                    deletingId ===
                                                    item.id
                                                }
                                                onClick={() =>
                                                    handleDelete(
                                                        item
                                                    )
                                                }
                                            >
                                                {deletingId ===
                                                item.id
                                                    ? "Deleting..."
                                                    : "Delete Media"}
                                            </Button>

                                        </div>

                                    </div>

                                )
                            )}

                    </div>

                )}

            </section>

            {error && (

                <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </p>

            )}

        </div>

    );
}