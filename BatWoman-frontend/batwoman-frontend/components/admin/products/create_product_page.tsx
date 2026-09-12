"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import ProductForm from "@/components/admin/products/ProductForm";
import ProductMediaUploader from "@/components/admin/products/ProductMediaUploader";

import { useCreateProduct } from "@/hooks/useCreateProduct";

import {
    AdminProductFormData,
} from "@/types/admin-product";

import {
    CreateProductRequest,
} from "@/services/adminProduct.service";

export default function CreateProductPage() {

    const router =
        useRouter();

    const createProduct =
        useCreateProduct();

    const [dialogOpen, setDialogOpen] =
        useState(true);

    const [productId, setProductId] =
        useState<string | null>(
            null
        );

    function handleCreateProduct(
        request: AdminProductFormData
    ) {

        /*
         * The ProductForm guarantees variants for create mode,
         * but the shared AdminProductFormData type keeps variants
         * optional because it is also used for product updates.
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

        const createRequest:
            CreateProductRequest = {

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
            request.variants,
        };

        createProduct.mutate(
            createRequest,
            {
                onSuccess:
                    (
                        product
                    ) => {

                        setProductId(
                            product.id
                        );

                    },
            }
        );

    }

    function handleUploadComplete() {

        router.push(
            "/admin/products"
        );

    }

    return (

        <div className="space-y-8 p-8">

            {!productId ? (

                <ProductForm

                    open={
                        dialogOpen
                    }

                    onOpenChange={
                        setDialogOpen
                    }

                    onSave={
                        handleCreateProduct
                    }

                    isSaving={
                        createProduct.isPending
                    }

                />

            ) : (

                <div className="space-y-6">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Upload Product Media
                        </h1>

                        <p className="text-muted-foreground">
                            Product created successfully.
                            Upload images or videos for this product.
                        </p>

                    </div>

                    <ProductMediaUploader

                        productId={
                            productId
                        }

                        onUploadComplete={
                            handleUploadComplete
                        }

                    />

                </div>

            )}

        </div>

    );
}