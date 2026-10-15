
"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    AdminProduct,
    AdminProductVariant,
} from "@/types/admin-product";

import { getProductById } from "@/services/adminProduct.service";

interface ProductTableProps {
    products: AdminProduct[];
    onEdit: (product: AdminProduct) => void;
    onDelete: (product: AdminProduct) => void;
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

        setVariantErrors((previous) => {
            const next = { ...previous };
            delete next[productId];
            return next;
        });

        try {
            const detail = await getProductById(productId);

            setVariantsByProduct((previous) => ({
                ...previous,
                [productId]: detail.variants ?? [],
            }));
        } catch (error) {
            console.error("Failed to load variants.", error);

            setVariantErrors((previous) => ({
                ...previous,
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
        <div className="w-full min-w-0 overflow-x-auto rounded-2xl border border-[#E4D9CA] bg-[#FBF8F3]">
            <table className="w-full min-w-[930px] table-fixed border-collapse text-left">
                <colgroup>
                    <col className="w-[140px]" />
                    <col className="w-[210px]" />
                    <col className="w-[150px]" />
                    <col className="w-[110px]" />
                    <col className="w-[140px]" />
                    <col className="w-[180px]" />
                </colgroup>

                <thead className="bg-[#F1E9DE]">
                <tr>
                    <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656]">
                        Image
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656]">
                        Product
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656]">
                        Category
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656]">
                        Price
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#766656]">
                        Status
                    </th>

                    <th className="whitespace-nowrap px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#766656]">
                        Actions
                    </th>
                </tr>
                </thead>

                {products.map((product) => {
                    const primary =
                        product.media?.find(
                            (item) => item.primaryMedia
                        ) ?? product.media?.[0];

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
                        <tr className="border-t border-[#E7DED2] transition-colors hover:bg-[#F5F0E8]/70">
                            <td className="px-4 py-4 align-top">
                                <div className="flex items-start gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleExpand(product)
                                        }
                                        className="mt-7 rounded-lg p-1.5 text-[#766656] transition-colors hover:bg-[#EAE0D3] hover:text-[#35291F]"
                                        aria-label={
                                            isExpanded
                                                ? "Collapse variants"
                                                : "Expand variants"
                                        }
                                        aria-expanded={isExpanded}
                                    >
                                        {isExpanded ? (
                                            <ChevronDown size={18} />
                                        ) : (
                                            <ChevronRight size={18} />
                                        )}
                                    </button>

                                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-[#E7DED2] bg-[#F1E9DE]">
                                        {primary?.mediaUrl ? (
                                            <img
                                                src={primary.mediaUrl}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center px-1 text-center text-[10px] text-[#A09280]">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>

                            <td className="break-words px-4 py-4 align-top">
                                <p className="font-medium leading-5 text-[#35291F]">
                                    {product.name}
                                </p>

                                <p className="mt-1 break-all text-xs text-[#948473]">
                                    {product.slug}
                                </p>

                                <p className="mt-2 text-xs text-[#766656]">
                                    {product.variantCount}{" "}
                                    {product.variantCount === 1
                                        ? "variant"
                                        : "variants"}
                                </p>
                            </td>

                            <td className="break-words px-4 py-4 align-top text-sm text-[#5D4A39]">
                                {product.category?.name ?? "—"}
                            </td>

                            <td className="whitespace-nowrap px-4 py-4 align-top text-sm font-medium tabular-nums text-[#35291F]">
                                ₹
                                {(
                                    product.discountPrice ??
                                    product.price
                                ).toLocaleString("en-IN")}
                            </td>

                            <td className="px-4 py-4 align-top">
                                <div className="flex flex-col items-start gap-2">
                                        <span
                                            className={
                                                product.active
                                                    ? "inline-flex whitespace-nowrap rounded-full border border-[#B8CFB8] bg-[#EAF2E8] px-2.5 py-1 text-xs font-medium text-[#426343]"
                                                    : "inline-flex whitespace-nowrap rounded-full border border-[#DED6CC] bg-[#EEEAE5] px-2.5 py-1 text-xs font-medium text-[#766656]"
                                            }
                                        >
                                            {product.active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    {product.featured && (
                                        <span className="inline-flex whitespace-nowrap rounded-full border border-[#DCC9A9] bg-[#F5EBDD] px-2.5 py-1 text-xs font-medium text-[#8B6D43]">
                                                Featured
                                            </span>
                                    )}

                                    {product.newArrival && (
                                        <span className="inline-flex whitespace-nowrap rounded-full border border-[#DCCDBA] bg-white px-2.5 py-1 text-xs font-medium text-[#766656]">
                                                New arrival
                                            </span>
                                    )}
                                </div>
                            </td>

                            <td className="px-4 py-4 align-top">
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="border-[#DCCDBA] bg-white text-[#35291F] shadow-sm hover:bg-[#F5F0E8] hover:text-[#35291F]"
                                        onClick={() =>
                                            onEdit(product)
                                        }
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        className="shadow-sm"
                                        onClick={() =>
                                            onDelete(product)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>

                        {isExpanded && (
                            <tr className="border-t border-[#E7DED2] bg-[#F5F0E8]">
                                <td className="px-4 py-4" colSpan={6}>
                                    <div className="rounded-xl border border-[#E4D9CA] bg-white p-3 sm:p-4">
                                        <p className="mb-4 font-[var(--font-playfair)] text-lg font-medium text-[#35291F]">
                                            Product Variants
                                        </p>

                                        {isLoading && (
                                            <p className="text-sm text-[#766656]">
                                                Loading variants...
                                            </p>
                                        )}

                                        {!isLoading && error && (
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-sm text-red-600">
                                                    {error}
                                                </p>

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-[#DCCDBA] bg-white text-[#35291F] hover:bg-[#F5F0E8]"
                                                    onClick={() =>
                                                        loadVariants(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Retry
                                                </Button>
                                            </div>
                                        )}

                                        {!isLoading &&
                                            !error &&
                                            (variants &&
                                            variants.length > 0 ? (
                                                <div className="overflow-x-auto">
                                                    <table className="w-full min-w-[560px] border-collapse">
                                                        <thead>
                                                        <tr className="border-b border-[#E7DED2] text-left text-xs uppercase tracking-wider text-[#766656]">
                                                            <th className="py-3 pr-4 font-semibold">
                                                                Color
                                                            </th>
                                                            <th className="py-3 pr-4 font-semibold">
                                                                Size
                                                            </th>
                                                            <th className="py-3 pr-4 font-semibold">
                                                                SKU
                                                            </th>
                                                            <th className="py-3 font-semibold">
                                                                Stock
                                                            </th>
                                                        </tr>
                                                        </thead>

                                                        <tbody>
                                                        {variants.map(
                                                            (variant) => (
                                                                <tr
                                                                    key={
                                                                        variant.id
                                                                    }
                                                                    className="border-b border-[#F0E8DE] last:border-b-0"
                                                                >
                                                                    <td className="py-3 pr-4 text-sm text-[#35291F]">
                                                                        <div className="flex items-center gap-2">
                                                                            {variant.colorHexCode && (
                                                                                <span
                                                                                    className="h-3 w-3 shrink-0 rounded-full border border-[#DCCDBA]"
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                        variant.colorHexCode,
                                                                                    }}
                                                                                />
                                                                            )}

                                                                            <span>
                                                                                        {
                                                                                            variant.color
                                                                                        }
                                                                                    </span>
                                                                        </div>
                                                                    </td>

                                                                    <td className="py-3 pr-4 text-sm text-[#5D4A39]">
                                                                        {
                                                                            variant.size
                                                                        }
                                                                    </td>

                                                                    <td className="break-all py-3 pr-4 font-mono text-xs text-[#948473]">
                                                                        {
                                                                            variant.sku
                                                                        }
                                                                    </td>

                                                                    <td className="whitespace-nowrap py-3 text-sm text-[#35291F]">
                                                                        {
                                                                            variant.availableQuantity
                                                                        }{" "}
                                                                        available
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-[#766656]">
                                                    No variants found for this product.
                                                </p>
                                            ))}
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    );
                })}
            </table>

            {products.length === 0 && (
                <div className="px-4 py-12 text-center">
                    <p className="font-[var(--font-playfair)] text-xl text-[#35291F]">
                        No products found
                    </p>
                    <p className="mt-2 text-sm text-[#948473]">
                        Products you add will appear here.
                    </p>
                </div>
            )}
        </div>
    );
}
