"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {ProductForm} from "@/components/admin/products/ProductForm";
import ProductMediaUploader from "@/components/admin/products/ProductMediaUploader";

import { useCreateProduct } from "@/hooks/useCreateProduct";

export default function CreateProductPage() {

    const router = useRouter();

    const createProduct = useCreateProduct();

    const [dialogOpen, setDialogOpen] = useState(true);

    const [productId, setProductId] =
        useState<string | null>(null);

    async function handleCreateProduct(request: any) {

        createProduct.mutate(request, {

            onSuccess: (product) => {

                setProductId(product.id);

            },

        });

    }

    function handleUploadComplete() {

        router.push("/admin/products");

    }

    return (

        <div className="space-y-8 p-8">

            {!productId ? (

                <ProductForm
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    onSave={handleCreateProduct}
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
                        productId={productId}
                        onUploadComplete={handleUploadComplete}
                    />

                </div>

            )}

        </div>

    );

}