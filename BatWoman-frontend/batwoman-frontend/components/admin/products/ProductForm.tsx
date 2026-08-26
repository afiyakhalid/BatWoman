"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    getCategories,
} from "@/services/adminCategory.service";

/*
 * Keep the form request independent from the various Category
 * interfaces used elsewhere in the application.
 *
 * This prevents the Category[] mismatch that was happening
 * between ProductForm and adminCategory.service.
 */
export interface AdminProductFormData {

    categoryId: string;

    name: string;

    description: string;

    fabric: string;

    color: string;

    size: string;

    price: number;

    discountPrice: number | null;

    featured: boolean;

    newArrival: boolean;

    active: boolean;

}

interface ProductSummary {

    id: string;

    categoryId: string;

    name: string;

    description: string | null;

    fabric: string | null;

    color: string | null;

    size: string | null;

    price: number;

    discountPrice: number | null;

    featured: boolean;

    newArrival: boolean;

    active: boolean;

}

interface ProductFormProps {

    open: boolean;

    onOpenChange: (open: boolean) => void;

    product?: ProductSummary | null;

    onSave: (
        request: AdminProductFormData
    ) => void;

    isSaving?: boolean;

}

/*
 * IMPORTANT:
 *
 * We derive the category type directly from getCategories().
 *
 * Therefore ProductForm can NEVER accidentally use a different
 * Category interface from another file.
 */
type AdminCategory =
    Awaited<ReturnType<typeof getCategories>>[number];

interface ProductFormState {

    categoryId: string;

    name: string;

    description: string;

    fabric: string;

    color: string;

    size: string;

    price: string;

    discountPrice: string;

    featured: boolean;

    newArrival: boolean;

    active: boolean;

}

function emptyForm(): ProductFormState {

    return {

        categoryId: "",

        name: "",

        description: "",

        fabric: "",

        color: "",

        size: "",

        price: "",

        discountPrice: "",

        featured: false,

        newArrival: false,

        active: true,

    };

}

function productToForm(
    product: ProductSummary
): ProductFormState {

    return {

        categoryId: product.categoryId,

        name: product.name,

        description: product.description ?? "",

        fabric: product.fabric ?? "",

        color: product.color ?? "",

        size: product.size ?? "",

        price: product.price.toString(),

        discountPrice:
            product.discountPrice?.toString() ?? "",

        featured: product.featured,

        newArrival: product.newArrival,

        active: product.active,

    };

}

export default function ProductForm({

                                        open,

                                        onOpenChange,

                                        product,

                                        onSave,

                                        isSaving = false,

                                    }: ProductFormProps) {

    /*
     * Categories returned by adminCategory.service.ts.
     */
    const [categories, setCategories] =
        useState<AdminCategory[]>([]);

    /*
     * The complete editable product form.
     */
    const [form, setForm] =
        useState<ProductFormState>(
            () => product
                ? productToForm(product)
                : emptyForm()
        );

    /*
     * Load categories whenever the dialog opens.
     */
    useEffect(() => {

        if (!open) {
            return;
        }

        let cancelled = false;

        async function loadCategories() {

            try {

                const data =
                    await getCategories();

                if (!cancelled) {

                    setCategories(data);

                }

            } catch (error) {

                console.error(
                    "Failed to load categories.",
                    error
                );

            }

        }

        loadCategories();

        return () => {

            cancelled = true;

        };

    }, [open]);

    /*
     * Synchronize the form whenever the selected product changes.
     *
     * The eslint rule is disabled ONLY for this intentional
     * synchronization between the incoming product prop and the
     * local editable form state.
     */
    useEffect(() => {

        if (!open) {
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm(
            product
                ? productToForm(product)
                : emptyForm()
        );

    }, [open, product]);

    function updateField<K extends keyof ProductFormState>(
        field: K,
        value: ProductFormState[K]
    ) {

        setForm((previous) => ({

            ...previous,

            [field]: value,

        }));

    }

    function handleSubmit() {

        /*
         * Basic client-side validation.
         *
         * Backend validation remains authoritative.
         */
        if (!form.categoryId) {

            return;

        }

        if (!form.name.trim()) {

            return;

        }

        if (!form.price.trim()) {

            return;

        }

        const numericPrice =
            Number(form.price);

        const numericDiscount =
            form.discountPrice.trim() === ""
                ? null
                : Number(form.discountPrice);

        if (
            Number.isNaN(numericPrice) ||
            numericPrice < 0
        ) {

            return;

        }

        if (
            numericDiscount !== null &&
            (
                Number.isNaN(numericDiscount) ||
                numericDiscount < 0
            )
        ) {

            return;

        }

        onSave({

            categoryId:
            form.categoryId,

            name:
                form.name.trim(),

            description:
                form.description.trim(),

            fabric:
                form.fabric.trim(),

            color:
                form.color.trim(),

            size:
                form.size.trim(),

            price:
            numericPrice,

            discountPrice:
            numericDiscount,

            featured:
            form.featured,

            newArrival:
            form.newArrival,

            active:
            form.active,

        });

    }

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">

                <DialogHeader>

                    <DialogTitle className="font-[var(--font-playfair)] text-3xl">

                        {product
                            ? "Edit Product"
                            : "Create Product"}

                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-6 py-4">

                    {/* =====================================================
                        CATEGORY + PRODUCT NAME
                    ====================================================== */}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div className="space-y-2">

                            <label
                                htmlFor="product-category"
                                className="text-sm font-medium"
                            >
                                Category
                            </label>

                            <select
                                id="product-category"
                                value={form.categoryId}
                                onChange={(event) =>
                                    updateField(
                                        "categoryId",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map(
                                    (category) => (

                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                        <div className="space-y-2">

                            <label
                                htmlFor="product-name"
                                className="text-sm font-medium"
                            >
                                Product Name
                            </label>

                            <Input
                                id="product-name"
                                value={form.name}
                                onChange={(event) =>
                                    updateField(
                                        "name",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                placeholder="Premium Black Abaya"
                            />

                        </div>

                    </div>

                    {/* =====================================================
                        DESCRIPTION
                    ====================================================== */}

                    <div className="space-y-2">

                        <label
                            htmlFor="product-description"
                            className="text-sm font-medium"
                        >
                            Description
                        </label>

                        <Textarea
                            id="product-description"
                            rows={5}
                            value={form.description}
                            onChange={(event) =>
                                updateField(
                                    "description",
                                    event.target.value
                                )
                            }
                            disabled={isSaving}
                            placeholder="Describe the product..."
                        />

                    </div>

                    {/* =====================================================
                        FABRIC / COLOR / SIZE
                    ====================================================== */}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                        <div className="space-y-2">

                            <label
                                htmlFor="product-fabric"
                                className="text-sm font-medium"
                            >
                                Fabric
                            </label>

                            <Input
                                id="product-fabric"
                                value={form.fabric}
                                onChange={(event) =>
                                    updateField(
                                        "fabric",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                placeholder="Nida"
                            />

                        </div>

                        <div className="space-y-2">

                            <label
                                htmlFor="product-color"
                                className="text-sm font-medium"
                            >
                                Color
                            </label>

                            <Input
                                id="product-color"
                                value={form.color}
                                onChange={(event) =>
                                    updateField(
                                        "color",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                placeholder="Black"
                            />

                        </div>

                        <div className="space-y-2">

                            <label
                                htmlFor="product-size"
                                className="text-sm font-medium"
                            >
                                Size
                            </label>

                            <Input
                                id="product-size"
                                value={form.size}
                                onChange={(event) =>
                                    updateField(
                                        "size",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                placeholder="M"
                            />

                        </div>

                    </div>

                    {/* =====================================================
                        PRICE
                    ====================================================== */}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div className="space-y-2">

                            <label
                                htmlFor="product-price"
                                className="text-sm font-medium"
                            >
                                Price
                            </label>

                            <Input
                                id="product-price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={(event) =>
                                    updateField(
                                        "price",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                placeholder="4999"
                            />

                        </div>

                        <div className="space-y-2">

                            <label
                                htmlFor="product-discount-price"
                                className="text-sm font-medium"
                            >
                                Discount Price
                            </label>

                            <Input
                                id="product-discount-price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.discountPrice}
                                onChange={(event) =>
                                    updateField(
                                        "discountPrice",
                                        event.target.value
                                    )
                                }
                                disabled={isSaving}
                                placeholder="4499"
                            />

                        </div>

                    </div>

                    {/* =====================================================
                        PRODUCT FLAGS
                    ====================================================== */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        <label className="flex items-center gap-2 text-sm font-medium">

                            <input
                                type="checkbox"
                                checked={form.featured}
                                onChange={(event) =>
                                    updateField(
                                        "featured",
                                        event.target.checked
                                    )
                                }
                                disabled={isSaving}
                            />

                            Featured

                        </label>

                        <label className="flex items-center gap-2 text-sm font-medium">

                            <input
                                type="checkbox"
                                checked={form.newArrival}
                                onChange={(event) =>
                                    updateField(
                                        "newArrival",
                                        event.target.checked
                                    )
                                }
                                disabled={isSaving}
                            />

                            New Arrival

                        </label>

                        <label className="flex items-center gap-2 text-sm font-medium">

                            <input
                                type="checkbox"
                                checked={form.active}
                                onChange={(event) =>
                                    updateField(
                                        "active",
                                        event.target.checked
                                    )
                                }
                                disabled={isSaving}
                            />

                            Active

                        </label>

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSaving}
                    >
                        {isSaving
                            ? "Saving..."
                            : product
                                ? "Save Changes"
                                : "Create Product"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}