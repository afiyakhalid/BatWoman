"use client";

import { useMemo, useState } from "react";

import ProductToolbar from "@/components/admin/products/ProductToolbar";
import ProductTable from "@/components/admin/products/ProductTable";
import ProductForm from "@/components/admin/products/ProductForm";
import ProductMediaUploader from "@/components/admin/products/ProductMediaUploader";
import DeleteProductDialog from "@/components/admin/products/DeleteProductDialog";

import { useAdminProducts } from "@/hooks/useAdminProducts";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";

import {
    getProductById,
    ProductMedia,
    CreateProductRequest,
} from "@/services/adminProduct.service";

import {
    AdminProduct,
    AdminProductFormData,
} from "@/types/admin-product";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [mediaOpen, setMediaOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState<AdminProduct | null>(null);

    const [media, setMedia] = useState<ProductMedia[]>([]);

    const [createdProductId, setCreatedProductId] =
        useState<string | null>(null);

    const [loadingProductId, setLoadingProductId] =
        useState<string | null>(null);

    const {
        data: products = [],
        isLoading,
        isError,
    } = useAdminProducts();

    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    /*
     * The admin product-list endpoint returns lightweight
     * product information and does not include variants.
     *
     * Therefore list filtering only uses fields that actually
     * exist in the response.
     */
    const filteredProducts = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        if (!normalizedSearch) {
            return products;
        }

        return products.filter((product) =>
            product.name
                .toLowerCase()
                .includes(normalizedSearch)
        );
    }, [products, search]);

    function handleAddProduct() {
        setSelectedProduct(null);
        setMedia([]);
        setCreatedProductId(null);
        setFormOpen(true);
    }

    /*
     * IMPORTANT:
     *
     * GET /products/admin does NOT contain variants.
     *
     * When Edit is clicked, fetch the detailed product first.
     * The detailed endpoint contains the variants.
     */
    async function handleEdit(product: AdminProduct) {
        if (loadingProductId) {
            return;
        }

        setLoadingProductId(product.id);
        setCreatedProductId(null);

        try {
            const detail = await getProductById(product.id);

            /*
             * Normalize the detailed media response into the
             * AdminProductMedia shape expected by AdminProduct.
             *
             * ProductMedia allows createdAt to be undefined,
             * while AdminProductMedia requires a string.
             */
            const normalizedMedia =
                (detail.media ?? []).map((item) => ({
                    id: item.id,
                    mediaType: item.mediaType,
                    mediaUrl: item.mediaUrl,
                    altText: item.altText ?? null,
                    primaryMedia: item.primaryMedia,
                    displayOrder: item.displayOrder,
                    createdAt: item.createdAt ?? "",
                }));

            const completeProduct: AdminProduct = {
                ...product,

                name: detail.name,
                slug: detail.slug,
                description: detail.description,
                fabric: detail.fabric,
                price: detail.price,
                discountPrice: detail.discountPrice,

                media: normalizedMedia,

                /*
                 * The detail endpoint is the source of truth
                 * for existing variants.
                 */
                variants: detail.variants ?? [],
            };

            setSelectedProduct(completeProduct);

            /*
             * Keep the media uploader state in its own type.
             */
            setMedia(detail.media ?? []);

            setFormOpen(true);
        } catch (error) {
            console.error(
                "Failed to load product details for editing.",
                error
            );
        } finally {
            setLoadingProductId(null);
        }
    }

    function handleDelete(product: AdminProduct) {
        setSelectedProduct(product);
        setDeleteOpen(true);
    }

    function handleSave(request: AdminProductFormData) {
        /*
         * ============================================================
         * EDIT EXISTING PRODUCT
         * ============================================================
         *
         * The backend now accepts variants in UpdateProductRequest.
         *
         * Existing variants contain their IDs.
         * New variants do not contain an ID.
         *
         * Existing inventory is preserved by the backend.
         * New variants receive their initial stock.
         */
        if (selectedProduct) {
            updateProduct.mutate(
                {
                    id: selectedProduct.id,
                    request,
                },
                {
                    onSuccess: async () => {
                        setFormOpen(false);

                        /*
                         * Refresh the detailed product after updating
                         * so the selected product remains synchronized
                         * with the backend, including its variants.
                         */
                        try {
                            const updated =
                                await getProductById(
                                    selectedProduct.id
                                );

                            const normalizedMedia =
                                (updated.media ?? []).map(
                                    (item) => ({
                                        id: item.id,
                                        mediaType:
                                        item.mediaType,
                                        mediaUrl:
                                        item.mediaUrl,
                                        altText:
                                            item.altText ??
                                            null,
                                        primaryMedia:
                                        item.primaryMedia,
                                        displayOrder:
                                        item.displayOrder,
                                        createdAt:
                                            item.createdAt ??
                                            "",
                                    })
                                );

                            const refreshedProduct: AdminProduct = {
                                ...selectedProduct,

                                name:
                                updated.name,

                                slug:
                                updated.slug,

                                description:
                                updated.description,

                                fabric:
                                updated.fabric,

                                price:
                                updated.price,

                                discountPrice:
                                updated.discountPrice,

                                media:
                                normalizedMedia,

                                variants:
                                    updated.variants ?? [],
                            };

                            setSelectedProduct(
                                refreshedProduct
                            );

                            setMedia(
                                updated.media ?? []
                            );
                        } catch (error) {
                            console.error(
                                "Failed to refresh product after update.",
                                error
                            );
                        }

                        setMediaOpen(true);
                    },
                }
            );

            return;
        }

        /*
         * ============================================================
         * CREATE NEW PRODUCT
         * ============================================================
         *
         * A product must contain at least one variant.
         */
        if (
            !request.variants ||
            request.variants.length === 0
        ) {
            console.error(
                "Product creation requires at least one variant."
            );

            return;
        }

        /*
         * The create endpoint expects only NEW variant fields:
         *
         * sizeId
         * colorId
         * sku
         * initialStock
         *
         * ProductVariantFormData also contains frontend-only fields
         * such as id and active, so construct the exact backend
         * create request here.
         */
        const createVariants =
            request.variants.map(
                (variant, index) => {

                    if (
                        variant.initialStock === null ||
                        variant.initialStock === undefined
                    ) {
                        throw new Error(
                            `Initial stock is required for Variant ${
                                index + 1
                            }.`
                        );
                    }

                    return {
                        sizeId:
                        variant.sizeId,

                        colorId:
                        variant.colorId,

                        sku:
                        variant.sku,

                        initialStock:
                        variant.initialStock,
                    };
                }
            );

        const createRequest: CreateProductRequest = {
            categoryId:
            request.categoryId,

            name:
            request.name,

            description:
            request.description,

            fabric:
            request.fabric,

            price:
            request.price,

            discountPrice:
            request.discountPrice,

            featured:
            request.featured,

            newArrival:
            request.newArrival,

            variants:
            createVariants,
        };

        createProduct.mutate(
            createRequest,
            {
                onSuccess: async (product) => {
                    setFormOpen(false);

                    setCreatedProductId(
                        product.id
                    );

                    setSelectedProduct(
                        null
                    );

                    setMedia([]);

                    setMediaOpen(true);
                },
            }
        );
    }

    async function confirmDelete() {
        if (!selectedProduct) {
            return;
        }

        try {
            await deleteProduct.mutateAsync(
                selectedProduct.id
            );

            setDeleteOpen(false);
            setSelectedProduct(null);
        } catch (error) {
            console.error(
                "Failed to delete product.",
                error
            );
        }
    }

    function handleMediaChanged(
        updatedMedia: ProductMedia[]
    ) {
        setMedia(updatedMedia);
    }

    function handleMediaDialogChange(
        open: boolean
    ) {
        setMediaOpen(open);

        if (!open) {
            setCreatedProductId(null);
            setMedia([]);
        }
    }

    if (isLoading) {
        return (
            <div className="p-8">
                Loading products...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8">
                <p className="text-red-600">
                    Failed to load products.
                </p>
            </div>
        );
    }

    const mediaProductId =
        createdProductId ??
        selectedProduct?.id ??
        null;

    return (
        <div className="space-y-8">
            <ProductToolbar
                search={search}
                onSearchChange={
                    setSearch
                }
                onAddProduct={
                    handleAddProduct
                }
            />

            <ProductTable
                products={
                    filteredProducts
                }
                onEdit={
                    handleEdit
                }
                onDelete={
                    handleDelete
                }
            />

            <ProductForm
                open={formOpen}
                onOpenChange={
                    setFormOpen
                }
                product={
                    selectedProduct
                }
                onSave={
                    handleSave
                }
                isSaving={
                    loadingProductId !==
                    null ||
                    createProduct.isPending ||
                    updateProduct.isPending
                }
            />

            <Dialog
                open={
                    mediaOpen &&
                    mediaProductId !== null
                }
                onOpenChange={
                    handleMediaDialogChange
                }
            >
                <DialogContent
                    className="
                        max-h-[95vh]
                        max-w-6xl
                        overflow-y-auto
                    "
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            {createdProductId
                                ? "Upload Product Media"
                                : `Manage Media — ${
                                    selectedProduct?.name ??
                                    "Product"
                                }`}
                        </DialogTitle>
                    </DialogHeader>

                    {mediaProductId && (
                        <ProductMediaUploader
                            productId={
                                mediaProductId
                            }
                            existingMedia={
                                media
                            }
                            onMediaChanged={
                                handleMediaChanged
                            }
                        />
                    )}
                </DialogContent>
            </Dialog>

            <DeleteProductDialog
                open={
                    deleteOpen
                }
                onOpenChange={
                    setDeleteOpen
                }
                product={
                    selectedProduct
                }
                onDelete={
                    confirmDelete
                }
                isLoading={
                    deleteProduct.isPending
                }
            />
        </div>
    );
}