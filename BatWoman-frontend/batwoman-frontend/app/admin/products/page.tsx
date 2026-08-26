"use client";

import {
    useMemo,
    useState,
} from "react";

import ProductToolbar from "@/components/admin/products/ProductToolbar";
import ProductTable from "@/components/admin/products/ProductTable";
import ProductForm from "@/components/admin/products/ProductForm";
import ProductMediaUploader from "@/components/admin/products/ProductMediaUploader";
import DeleteProductDialog from "@/components/admin/products/DeleteProductDialog";

import {
    useAdminProducts,
} from "@/hooks/useAdminProducts";

import {
    useCreateProduct,
} from "@/hooks/useCreateProduct";

import {
    useUpdateProduct,
} from "@/hooks/useUpdateProduct";

import {
    useDeleteProduct,
} from "@/hooks/useDeleteProduct";

import {
    getProductById,
    ProductMedia,
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

    const [search, setSearch] =
        useState("");

    const [formOpen, setFormOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [mediaOpen, setMediaOpen] =
        useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState<AdminProduct | null>(
            null
        );

    const [media, setMedia] =
        useState<ProductMedia[]>([]);

    const [createdProductId, setCreatedProductId] =
        useState<string | null>(null);

    const {
        data: products = [],
        isLoading,
        isError,
    } = useAdminProducts();

    const createProduct =
        useCreateProduct();

    const updateProduct =
        useUpdateProduct();

    const deleteProduct =
        useDeleteProduct();

    const filteredProducts =
        useMemo(
            () => {

                const normalizedSearch =
                    search
                        .trim()
                        .toLowerCase();

                if (
                    !normalizedSearch
                ) {

                    return products;

                }

                return products.filter(
                    (
                        product
                    ) =>
                        product.name
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            )
                );

            },
            [
                products,
                search,
            ]
        );

    function handleAddProduct() {

        setSelectedProduct(
            null
        );

        setMedia([]);

        setFormOpen(
            true
        );
    }

    function handleEdit(
        product: AdminProduct
    ) {

        setSelectedProduct(
            product
        );

        setMedia(
            product.media ?? []
        );

        setFormOpen(
            true
        );
    }

    function handleDelete(
        product: AdminProduct
    ) {

        setSelectedProduct(
            product
        );

        setDeleteOpen(
            true
        );
    }

    function handleSave(
        request: AdminProductFormData
    ) {

        /*
         * UPDATE
         */
        if (
            selectedProduct
        ) {

            updateProduct.mutate(
                {
                    id:
                    selectedProduct.id,

                    request,
                },
                {
                    onSuccess:
                        async () => {

                            setFormOpen(
                                false
                            );

                            try {

                                const updated =
                                    await getProductById(
                                        selectedProduct.id
                                    );

                                setMedia(
                                    updated.media ??
                                    []
                                );

                            } catch (
                                error
                                ) {

                                console.error(
                                    "Failed to refresh product media.",
                                    error
                                );

                            }

                            setMediaOpen(
                                true
                            );
                        },
                }
            );

            return;
        }

        /*
         * CREATE
         */
        createProduct.mutate(
            request,
            {
                onSuccess:
                    async (
                        product
                    ) => {

                        setFormOpen(
                            false
                        );

                        setCreatedProductId(
                            product.id
                        );

                        setMedia([]);

                        setMediaOpen(
                            true
                        );
                    },
            }
        );
    }

    async function confirmDelete() {

        if (
            !selectedProduct
        ) {

            return;
        }

        try {

            await deleteProduct.mutateAsync(
                selectedProduct.id
            );

            setDeleteOpen(
                false
            );

            setSelectedProduct(
                null
            );

        } catch (
            error
            ) {

            console.error(
                "Failed to delete product.",
                error
            );
        }
    }

    async function handleMediaChanged(
        updatedMedia: ProductMedia[]
    ) {

        setMedia(
            updatedMedia
        );
    }

    function handleMediaDialogChange(
        open: boolean
    ) {

        setMediaOpen(
            open
        );

        if (!open) {

            setCreatedProductId(
                null
            );

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

                search={
                    search
                }

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

            {/* =====================================================
                CREATE / EDIT PRODUCT
            ====================================================== */}

            <ProductForm

                open={
                    formOpen
                }

                onOpenChange={
                    setFormOpen
                }

                product={
                    selectedProduct
                        ? {

                            id:
                            selectedProduct.id,

                            categoryId:
                            selectedProduct
                                .category.id,

                            name:
                            selectedProduct.name,

                            description:
                            selectedProduct
                                .description,

                            fabric:
                            selectedProduct
                                .fabric,

                            color:
                            selectedProduct
                                .color,

                            size:
                            selectedProduct
                                .size,

                            price:
                            selectedProduct.price,

                            discountPrice:
                            selectedProduct
                                .discountPrice,

                            featured:
                            selectedProduct
                                .featured,

                            newArrival:
                            selectedProduct
                                .newArrival,

                            active:
                            selectedProduct.active,

                        }
                        : null
                }

                onSave={
                    handleSave
                }

                isSaving={
                    createProduct.isPending ||
                    updateProduct.isPending
                }

            />

            {/* =====================================================
                MEDIA MANAGEMENT
            ====================================================== */}

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
                                    selectedProduct
                                        ?.name ??
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

            {/* =====================================================
                DELETE PRODUCT
            ====================================================== */}

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