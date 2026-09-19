"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    AdminProduct,
    AdminProductVariant,
} from "@/types/admin-product";
import { getProductById } from "@/services/adminProduct.service";

interface ProductTableProps {

    products: AdminProduct[];

    onEdit: (
        product: AdminProduct
    ) => void;

    onDelete: (
        product: AdminProduct
    ) => void;

}

export default function ProductTable({

                                         products,

                                         onEdit,

                                         onDelete,

                                     }: ProductTableProps) {
    const [expandedProductId, setExpandedProductId] =
        useState<string | null>(null);

    const [variantsByProduct, setVariantsByProduct] =
        useState<Record<string, AdminProductVariant[]>>({});

    const [loadingVariants, setLoadingVariants] =
        useState<string | null>(null);

    const [variantErrors, setVariantErrors] =
        useState<Record<string, string>>({});

    async function loadVariants(productId: string) {
        setLoadingVariants(productId);
        setVariantErrors((prev) => {
            const next = { ...prev };
            delete next[productId];
            return next;
        });

        try {
            const detail = await getProductById(productId);
            setVariantsByProduct((prev) => ({
                ...prev,
                [productId]: detail.variants ?? [],
            }));
        } catch (error) {
            console.error("Failed to load variants.", error);
            setVariantErrors((prev) => ({
                ...prev,
                [productId]: "Unable to load variants.",
            }));
        } finally {
            setLoadingVariants((current) =>
                current === productId ? null : current
            );
        }
    }

    async function toggleExpand(product: AdminProduct) {
        const isOpen = expandedProductId === product.id;

        if (isOpen) {
            setExpandedProductId(null);
            return;
        }

        setExpandedProductId(product.id);

        if (
            variantsByProduct[product.id] === undefined &&
            loadingVariants !== product.id
        ) {
            await loadVariants(product.id);
        }
    }

    return (

        <div className="overflow-hidden rounded-xl border">

            <table className="w-full table-fixed">
                <colgroup>
                    <col className="w-[140px]" />
                    <col className="w-[35%]" />
                    <col className="w-[18%]" />
                    <col className="w-[12%]" />
                    <col className="w-[15%]" />
                    <col className="w-[20%]" />
                </colgroup>

                <thead className="bg-muted">

                <tr>

                    <th className="p-4 text-left">
                        Image
                    </th>

                    <th className="p-4 text-left">
                        Product
                    </th>

                    <th className="p-4 text-left">
                        Category
                    </th>

                    <th className="p-4 text-left">
                        Price
                    </th>

                    <th className="p-4 text-left">
                        Status
                    </th>

                    <th className="p-4 text-right">
                        Actions
                    </th>

                </tr>

                </thead>

                {products.map(
                    (product) => {

                        const primary =
                            product.media?.find(
                                (item) =>
                                    item.primaryMedia
                            )
                            ??
                            product.media?.[0];

                        const isExpanded =
                            expandedProductId === product.id;

                        const variants =
                            variantsByProduct[product.id];

                        const isLoading =
                            loadingVariants === product.id;

                        const error =
                            variantErrors[product.id];

                        return (
                            <tbody key={product.id}>
                            <tr
                                className="border-t"
                            >

                                <td className="p-4">

                                    <div className="flex items-start gap-3">
                                        <button
                                            type="button"
                                            onClick={() => toggleExpand(product)}
                                            className="mt-7 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                            aria-label={
                                                isExpanded
                                                    ? "Collapse variants"
                                                    : "Expand variants"
                                            }
                                        >
                                            {isExpanded ? (
                                                <ChevronDown size={16} />
                                            ) : (
                                                <ChevronRight size={16} />
                                            )}
                                        </button>

                                        <div className="
                                                h-20
                                                w-16
                                                overflow-hidden
                                                rounded
                                                bg-muted
                                            ">

                                        {primary?.mediaUrl && (

                                            <img
                                                src={
                                                    primary.mediaUrl
                                                }
                                                alt={
                                                    product.name
                                                }
                                                className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                    "
                                            />

                                        )}

                                        </div>
                                    </div>

                                </td>

                                <td className="p-4">

                                    <p className="font-medium">
                                        {
                                            product.name
                                        }
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {
                                            product.slug
                                        }
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {product.variantCount}{" "}
                                        {product.variantCount === 1
                                            ? "variant"
                                            : "variants"}
                                    </p>

                                </td>

                                <td className="p-4">

                                    {
                                        product
                                            .category
                                            ?.name
                                    }

                                </td>

                                <td className="p-4">

                                    ₹
                                    {
                                        product.discountPrice ??
                                        product.price
                                    }

                                </td>

                                <td className="p-4">
 
                                    <div className="flex flex-wrap gap-2">
                                        <span
                                            className={
                                                product.active
                                                    ? "rounded bg-green-100 px-2 py-1 text-xs text-green-800"
                                                    : "rounded bg-neutral-200 px-2 py-1 text-xs text-neutral-700"
                                            }
                                        >
                                            {product.active ? "Active" : "Inactive"}
                                        </span>
 
                                        {product.featured && (
 
                                            <span className="
                                                    rounded
                                                    bg-blue-100
                                                    px-2
                                                    py-1
                                                    text-xs
                                                ">
                                                    Featured
                                                </span>
 
                                        )}
 
                                        {product.newArrival && (
 
                                            <span className="
                                                    rounded
                                                    bg-purple-100
                                                    px-2
                                                    py-1
                                                    text-xs
                                                ">
                                                    New
                                                </span>
 
                                        )}
 
                                    </div>
 
                                </td>

                                <td className="p-4">

                                    <div className="
                                            flex
                                            justify-end
                                            gap-2
                                        ">

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                onEdit(
                                                    product
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() =>
                                                onDelete(
                                                    product
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>

                                    </div>

                                </td>

                            </tr>
                            {isExpanded && (
                                <tr className="border-t bg-muted/20">
                                    <td className="p-4" colSpan={6}>
                                        <div className="rounded-lg border bg-background p-4">
                                            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                                                VARIANTS
                                            </p>

                                            {isLoading && (
                                                <p className="text-sm text-muted-foreground">
                                                    Loading variants...
                                                </p>
                                            )}

                                            {!isLoading && error && (
                                                <div className="flex items-center gap-3">
                                                    <p className="text-sm text-red-600">
                                                        {error}
                                                    </p>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => loadVariants(product.id)}
                                                    >
                                                        Retry
                                                    </Button>
                                                </div>
                                            )}

                                            {!isLoading && !error && (
                                                variants && variants.length > 0 ? (
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full min-w-[640px]">
                                                            <thead>
                                                            <tr className="border-b text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
                                                                <th className="py-2 pr-4">Color</th>
                                                                <th className="py-2 pr-4">Size</th>
                                                                <th className="py-2 pr-4">SKU</th>
                                                                <th className="py-2">Stock</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {variants.map((variant) => (
                                                                <tr key={variant.id} className="border-b last:border-b-0">
                                                                    <td className="py-3 pr-4 text-sm">
                                                                        <div className="flex items-center gap-2">
                                                                            {variant.colorHexCode && (
                                                                                <span
                                                                                    className="h-2.5 w-2.5 rounded-full border border-neutral-300"
                                                                                    style={{ backgroundColor: variant.colorHexCode }}
                                                                                />
                                                                            )}
                                                                            <span>{variant.color}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-3 pr-4 text-sm">
                                                                        {variant.size}
                                                                    </td>
                                                                    <td className="py-3 pr-4 text-xs font-mono text-muted-foreground">
                                                                        {variant.sku}
                                                                    </td>
                                                                    <td className="py-3 text-sm">
                                                                        {variant.availableQuantity} available
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">
                                                        No variants found for this product.
                                                    </p>
                                                )
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>

                        );
                    }
                )}

            </table>

        </div>

    );
}