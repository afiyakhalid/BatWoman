"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    CheckCircle2,
    ImagePlus,
    Sparkles,
} from "lucide-react";

import ProductForm from "@/components/admin/products/ProductForm";
import ProductMediaUploader from "@/components/admin/products/ProductMediaUploader";

import { useCreateProduct } from "@/hooks/useCreateProduct";

import type { AdminProductFormData } from "@/types/admin-product";
import type { CreateProductRequest } from "@/services/adminProduct.service";

export default function CreateProductPage() {
    const router = useRouter();
    const createProduct = useCreateProduct();

    const [dialogOpen, setDialogOpen] = useState(true);
    const [productId, setProductId] = useState<string | null>(null);

    function handleCreateProduct(request: AdminProductFormData) {
        if (!request.variants || request.variants.length === 0) {
            console.error("Product creation requires at least one variant.");
            return;
        }

        const createRequest: CreateProductRequest = {
            categoryId: request.categoryId,
            name: request.name,
            description: request.description,
            fabric: request.fabric,
            price: request.price,
            discountPrice: request.discountPrice,
            featured: request.featured,
            newArrival: request.newArrival,
            variants: request.variants.map((variant) => ({
                sizeId: variant.sizeId,
                colorId: variant.colorId,
                sku: variant.sku,
                initialStock: variant.initialStock ?? 0,
            })),
        };

        createProduct.mutate(createRequest, {
            onSuccess: (product) => {
                setProductId(product.id);
            },
        });
    }

    function handleUploadComplete() {
        router.push("/admin/products");
    }

    return (
        <div className="mx-auto min-w-0 max-w-[1200px] space-y-6 pb-8 sm:space-y-8 sm:pb-12">
            {!productId ? (
                <>
                    {/* Page heading */}
                    <div className="flex min-w-0 items-start gap-3">
                        <button
                            type="button"
                            onClick={() => router.push("/admin/products")}
                            aria-label="Back to products"
                            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5D8C6] bg-[#FFFDFA] text-[#796954] transition-colors hover:bg-[#F5EDE2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A18A6E]/40"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18A6E]">
                                Store management
                            </p>

                            <h1 className="mt-2 font-[var(--font-playfair)] text-3xl font-medium tracking-tight text-[#30271F] sm:text-4xl">
                                Create Product
                            </h1>

                            <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#8B8174] sm:text-sm">
                                Add a new piece to your collection, configure its
                                variants, and prepare it for your storefront.
                            </p>
                        </div>
                    </div>

                    {/* Product form */}
                    <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E7DDD0] bg-[#FFFDFA] p-3 shadow-[0_2px_8px_rgba(70,50,30,0.04)] sm:p-6 lg:p-8">
                        <div className="mb-5 flex items-center gap-3 border-b border-[#F0E8DE] pb-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6D8C5] bg-[#F5EDE2] text-[#8D6B43]">
                                <Sparkles size={18} strokeWidth={1.7} />
                            </div>

                            <div>
                                <h2 className="font-[var(--font-playfair)] text-xl text-[#30271F] sm:text-2xl">
                                    Product Details
                                </h2>

                                <p className="mt-1 text-xs text-[#8B8174]">
                                    Enter the product information and available variants.
                                </p>
                            </div>
                        </div>

                        <ProductForm
                            open={dialogOpen}
                            onOpenChange={setDialogOpen}
                            onSave={handleCreateProduct}
                            isSaving={createProduct.isPending}
                        />
                    </section>
                </>
            ) : (
                <div className="space-y-6">
                    {/* Success heading */}
                    <section className="rounded-2xl border border-[#D7E5D2] bg-gradient-to-br from-[#FFFDFA] to-[#EDF4E9] p-5 sm:p-8">
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D7E5D2] bg-white text-[#56734D]">
                                <CheckCircle2 size={23} strokeWidth={1.7} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#718766]">
                                    Product created
                                </p>

                                <h1 className="mt-2 font-[var(--font-playfair)] text-2xl font-medium text-[#30271F] sm:text-4xl">
                                    Upload Product Media
                                </h1>

                                <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#6F7F66] sm:text-sm">
                                    Your product has been created. Upload its images or
                                    videos to complete the product setup.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Media uploader */}
                    <section className="min-w-0 rounded-2xl border border-[#E7DDD0] bg-[#FFFDFA] p-3 shadow-[0_2px_8px_rgba(70,50,30,0.04)] sm:p-6 lg:p-8">
                        <div className="mb-5 flex items-center gap-3 border-b border-[#F0E8DE] pb-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6D8C5] bg-[#F5EDE2] text-[#8D6B43]">
                                <ImagePlus size={19} strokeWidth={1.7} />
                            </div>

                            <div>
                                <h2 className="font-[var(--font-playfair)] text-xl text-[#30271F] sm:text-2xl">
                                    Product Gallery
                                </h2>

                                <p className="mt-1 text-xs text-[#8B8174]">
                                    Add the media customers will see in your store.
                                </p>
                            </div>
                        </div>

                        <ProductMediaUploader
                            productId={productId}
                            onUploadComplete={handleUploadComplete}
                        />
                    </section>
                </div>
            )}
        </div>
    );
}