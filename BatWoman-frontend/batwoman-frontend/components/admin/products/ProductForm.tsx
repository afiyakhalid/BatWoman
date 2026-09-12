"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

import {
    Textarea,
} from "@/components/ui/textarea";

import {
    getCategories,
} from "@/services/adminCategory.service";

import {
    createColor,
    getAdminColors,
    getAdminSizes,
} from "@/services/adminProduct.service";

import {
    AdminProduct,
    AdminProductFormData,
    ProductVariantFormData,
} from "@/types/admin-product";

import {
    Color,
} from "@/types/color";

interface ProductFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: AdminProduct | null;
    onSave: (request: AdminProductFormData) => void;
    isSaving?: boolean;
}

type AdminCategory =
    Awaited<ReturnType<typeof getCategories>>[number];

interface ProductFormState {
    categoryId: string;
    name: string;
    description: string;
    fabric: string;
    price: string;
    discountPrice: string;
    featured: boolean;
    newArrival: boolean;
    active: boolean;
    variants: ProductVariantFormData[];
}

interface NewColorFormState {
    name: string;
    hexCode: string;
}

function createEmptyVariant(): ProductVariantFormData {
    return {
        sizeId: "",
        colorId: "",
        sku: "",
        initialStock: 0,
        active: true,
    };
}

function createEmptyForm(): ProductFormState {
    return {
        categoryId: "",
        name: "",
        description: "",
        fabric: "",
        price: "",
        discountPrice: "",
        featured: false,
        newArrival: false,
        active: true,
        variants: [createEmptyVariant()],
    };
}

function createEmptyColorForm(): NewColorFormState {
    return {
        name: "",
        hexCode: "#000000",
    };
}

function productToForm(
    product: AdminProduct
): ProductFormState {
    return {
        categoryId: product.category.id,
        name: product.name,
        description: product.description ?? "",
        fabric: product.fabric ?? "",
        price: product.price.toString(),
        discountPrice:
            product.discountPrice?.toString() ?? "",
        featured: product.featured,
        newArrival: product.newArrival,
        active: product.active,

        variants: product.variants.map(
            (variant) => ({
                id: variant.id,
                sizeId: variant.sizeId,
                colorId: variant.colorId,
                sku: variant.sku,

                /*
                 * Existing inventory is intentionally not
                 * sent as initialStock.
                 *
                 * Inventory is managed separately.
                 */
                initialStock: null,

                active: variant.active,
            })
        ),
    };
}

/*
 * Converts a human-readable color name into the internal
 * stable color code required by the backend.
 *
 * Examples:
 *
 * Midnight Blue -> MIDNIGHT-BLUE
 * Dusty Rose    -> DUSTY-ROSE
 * Black & Gold  -> BLACK-GOLD
 */
function generateColorCode(
    name: string
): string {
    return name
        .trim()
        .toUpperCase()
        .replace(/&/g, " AND ")
        .replace(/[^A-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-+/g, "-");
}

export default function ProductForm({
                                        open,
                                        onOpenChange,
                                        product,
                                        onSave,
                                        isSaving = false,
                                    }: ProductFormProps) {

    const [categories, setCategories] =
        useState<AdminCategory[]>([]);

    const [colors, setColors] =
        useState<Color[]>([]);

    const [sizes, setSizes] =
        useState<
            Awaited<ReturnType<typeof getAdminSizes>>
        >([]);

    const [form, setForm] =
        useState<ProductFormState>(
            product
                ? productToForm(product)
                : createEmptyForm()
        );

    const [colorDialogOpen, setColorDialogOpen] =
        useState(false);

    const [pendingColorVariantIndex, setPendingColorVariantIndex] =
        useState<number | null>(null);

    const [newColor, setNewColor] =
        useState<NewColorFormState>(
            createEmptyColorForm()
        );

    const [isCreatingColor, setIsCreatingColor] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    /*
     * Load categories, colors and sizes.
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        let cancelled = false;

        async function loadFormData() {
            try {
                const [
                    categoryData,
                    colorData,
                    sizeData,
                ] = await Promise.all([
                    getCategories(),
                    getAdminColors(),
                    getAdminSizes(),
                ]);

                if (cancelled) {
                    return;
                }

                setCategories(categoryData);

                setColors(
                    colorData
                        .filter(
                            (color) => color.active
                        )
                        .sort(
                            (a, b) =>
                                a.displayOrder -
                                b.displayOrder
                        )
                );

                setSizes(sizeData);
            } catch (error) {
                console.error(
                    "Failed to load product form data.",
                    error
                );

                if (!cancelled) {
                    setErrorMessage(
                        "Failed to load categories, colors, or sizes."
                    );
                }
            }
        }

        loadFormData();

        return () => {
            cancelled = true;
        };
    }, [open]);

    /*
     * Synchronize form state when switching between
     * create and edit modes.
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        setForm(
            product
                ? productToForm(product)
                : createEmptyForm()
        );

        setErrorMessage("");
    }, [open, product]);

    function updateProductField<
        K extends Exclude<
            keyof ProductFormState,
            "variants"
        >
    >(
        field: K,
        value: ProductFormState[K]
    ) {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    }

    function updateVariant(
        index: number,
        field: keyof ProductVariantFormData,
        value:
            | string
            | number
            | boolean
            | null
    ) {
        setForm((previous) => {
            const variants = [
                ...previous.variants,
            ];

            variants[index] = {
                ...variants[index],
                [field]: value,
            };

            return {
                ...previous,
                variants,
            };
        });
    }

    function addVariant() {
        setForm((previous) => ({
            ...previous,
            variants: [
                ...previous.variants,
                createEmptyVariant(),
            ],
        }));
    }

    function removeVariant(index: number) {
        if (form.variants.length === 1) {
            return;
        }

        setForm((previous) => ({
            ...previous,
            variants:
                previous.variants.filter(
                    (_, variantIndex) =>
                        variantIndex !== index
                ),
        }));
    }

    /*
     * ============================================================
     * NEW COLOR
     * ============================================================
     *
     * The admin only enters:
     *
     * - Color name
     * - Visual color
     *
     * Code is generated automatically.
     * Display order is handled automatically by the backend.
     */
    function openCreateColor(
        variantIndex: number
    ) {
        setPendingColorVariantIndex(
            variantIndex
        );

        setNewColor(
            createEmptyColorForm()
        );

        setErrorMessage("");

        setColorDialogOpen(true);
    }

    async function handleCreateColor() {
        const name =
            newColor.name.trim();

        if (!name) {
            setErrorMessage(
                "Color name is required."
            );

            return;
        }

        const code =
            generateColorCode(name);

        if (!code) {
            setErrorMessage(
                "Please enter a valid color name."
            );

            return;
        }

        /*
         * Prevent obviously duplicate colors
         * before making the API request.
         */
        const duplicateColor =
            colors.some(
                (color) =>
                    color.name.trim().toLowerCase() ===
                    name.toLowerCase() ||
                    color.code.trim().toLowerCase() ===
                    code.toLowerCase()
            );

        if (duplicateColor) {
            setErrorMessage(
                "A color with this name already exists."
            );

            return;
        }

        setIsCreatingColor(true);
        setErrorMessage("");

        try {
            const createdColor =
                await createColor({
                    name,
                    code,
                    hexCode:
                        newColor.hexCode || undefined,
                });

            /*
             * Add the new color to the dropdown immediately.
             */
            setColors((previous) =>
                [
                    ...previous.filter(
                        (color) =>
                            color.id !==
                            createdColor.id
                    ),
                    createdColor,
                ]
                    .filter(
                        (color) =>
                            color.active
                    )
                    .sort(
                        (a, b) =>
                            a.displayOrder -
                            b.displayOrder
                    )
            );

            /*
             * Automatically select the new color
             * on the variant from which the dialog
             * was opened.
             */
            if (
                pendingColorVariantIndex !== null
            ) {
                updateVariant(
                    pendingColorVariantIndex,
                    "colorId",
                    createdColor.id
                );
            }

            setPendingColorVariantIndex(
                null
            );

            setNewColor(
                createEmptyColorForm()
            );

            setColorDialogOpen(false);
        } catch (error) {
            console.error(
                "Failed to create color.",
                error
            );

            setErrorMessage(
                "Failed to create color. The generated color code may already exist."
            );
        } finally {
            setIsCreatingColor(false);
        }
    }

    /*
     * ============================================================
     * FORM SUBMISSION
     * ============================================================
     */
    function handleSubmit() {
        setErrorMessage("");

        if (!form.categoryId) {
            setErrorMessage(
                "Please select a category."
            );

            return;
        }

        if (!form.name.trim()) {
            setErrorMessage(
                "Product name is required."
            );

            return;
        }

        if (!form.price.trim()) {
            setErrorMessage(
                "Price is required."
            );

            return;
        }

        const numericPrice =
            Number(form.price);

        if (
            Number.isNaN(numericPrice) ||
            numericPrice < 0
        ) {
            setErrorMessage(
                "Price must be a valid non-negative number."
            );

            return;
        }

        const numericDiscount =
            form.discountPrice.trim() === ""
                ? null
                : Number(form.discountPrice);

        if (
            numericDiscount !== null &&
            (
                Number.isNaN(
                    numericDiscount
                ) ||
                numericDiscount < 0
            )
        ) {
            setErrorMessage(
                "Discount price must be a valid non-negative number."
            );

            return;
        }

        if (form.variants.length === 0) {
            setErrorMessage(
                "At least one product variant is required."
            );

            return;
        }

        /*
         * Validate every variant.
         */
        for (
            let index = 0;
            index < form.variants.length;
            index++
        ) {
            const variant =
                form.variants[index];

            if (!variant.colorId) {
                setErrorMessage(
                    `Please select a color for Variant ${
                        index + 1
                    }.`
                );

                return;
            }

            if (!variant.sizeId) {
                setErrorMessage(
                    `Please select a size for Variant ${
                        index + 1
                    }.`
                );

                return;
            }

            if (!variant.sku.trim()) {
                setErrorMessage(
                    `SKU is required for Variant ${
                        index + 1
                    }.`
                );

                return;
            }

            /*
             * Only NEW variants require initial stock.
             */
            if (
                !variant.id &&
                (
                    variant.initialStock === null ||
                    variant.initialStock === undefined ||
                    variant.initialStock < 0
                )
            ) {
                setErrorMessage(
                    `Initial stock is required for new Variant ${
                        index + 1
                    }.`
                );

                return;
            }
        }

        /*
         * Detect duplicate size/color combinations.
         */
        const combinations =
            new Set<string>();

        const skus =
            new Set<string>();

        for (
            let index = 0;
            index < form.variants.length;
            index++
        ) {
            const variant =
                form.variants[index];

            const combination =
                `${variant.sizeId}:${variant.colorId}`;

            if (
                combinations.has(
                    combination
                )
            ) {
                setErrorMessage(
                    `Variant ${
                        index + 1
                    } duplicates another size/color combination.`
                );

                return;
            }

            combinations.add(
                combination
            );

            const normalizedSku =
                variant.sku
                    .trim()
                    .toLowerCase();

            if (
                skus.has(
                    normalizedSku
                )
            ) {
                setErrorMessage(
                    `Variant ${
                        index + 1
                    } duplicates another SKU.`
                );

                return;
            }

            skus.add(
                normalizedSku
            );
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

            variants:
                form.variants.map(
                    (variant) => ({
                        ...(variant.id
                            ? {
                                id:
                                variant.id,
                            }
                            : {}),

                        sizeId:
                        variant.sizeId,

                        colorId:
                        variant.colorId,

                        sku:
                            variant.sku.trim(),

                        /*
                         * Existing variants:
                         * null → backend preserves inventory.
                         *
                         * New variants:
                         * initial stock is sent.
                         */
                        initialStock:
                            variant.id
                                ? null
                                : variant.initialStock,

                        active:
                        variant.active,
                    })
                ),
        });
    }

    return (
        <>
            {/* =========================================================
                PRODUCT FORM
            ========================================================== */}

            <Dialog
                open={open}
                onOpenChange={onOpenChange}
            >
                <DialogContent
                    className="
                        max-h-[95vh]
                        overflow-y-auto
                        sm:max-w-5xl
                    "
                >
                    <DialogHeader>
                        <DialogTitle
                            className="
                                font-[var(--font-playfair)]
                                text-3xl
                            "
                        >
                            {product
                                ? "Edit Product"
                                : "Create Product"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">

                        {/* =================================================
                            CATEGORY + NAME
                        ================================================== */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-6
                                md:grid-cols-2
                            "
                        >
                            <div className="space-y-2">
                                <label
                                    htmlFor="product-category"
                                    className="text-sm font-medium"
                                >
                                    Category
                                </label>

                                <select
                                    id="product-category"
                                    value={
                                        form.categoryId
                                    }
                                    onChange={(event) =>
                                        updateProductField(
                                            "categoryId",
                                            event.target.value
                                        )
                                    }
                                    disabled={
                                        isSaving
                                    }
                                    className="
                                        w-full
                                        rounded-md
                                        border
                                        border-input
                                        bg-background
                                        px-3
                                        py-2
                                        text-sm
                                    "
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map(
                                        (category) => (
                                            <option
                                                key={
                                                    category.id
                                                }
                                                value={
                                                    category.id
                                                }
                                            >
                                                {
                                                    category.name
                                                }
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
                                    value={
                                        form.name
                                    }
                                    onChange={(event) =>
                                        updateProductField(
                                            "name",
                                            event.target.value
                                        )
                                    }
                                    disabled={
                                        isSaving
                                    }
                                    placeholder="Premium Black Abaya"
                                />
                            </div>
                        </div>

                        {/* =================================================
                            DESCRIPTION
                        ================================================== */}

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
                                value={
                                    form.description
                                }
                                onChange={(event) =>
                                    updateProductField(
                                        "description",
                                        event.target.value
                                    )
                                }
                                disabled={
                                    isSaving
                                }
                                placeholder="Describe the product..."
                            />
                        </div>

                        {/* =================================================
                            FABRIC
                        ================================================== */}

                        <div className="space-y-2">
                            <label
                                htmlFor="product-fabric"
                                className="text-sm font-medium"
                            >
                                Fabric
                            </label>

                            <Input
                                id="product-fabric"
                                value={
                                    form.fabric
                                }
                                onChange={(event) =>
                                    updateProductField(
                                        "fabric",
                                        event.target.value
                                    )
                                }
                                disabled={
                                    isSaving
                                }
                                placeholder="Premium Crepe"
                            />
                        </div>

                        {/* =================================================
                            PRICE
                        ================================================== */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-6
                                md:grid-cols-2
                            "
                        >
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
                                    value={
                                        form.price
                                    }
                                    onChange={(event) =>
                                        updateProductField(
                                            "price",
                                            event.target.value
                                        )
                                    }
                                    disabled={
                                        isSaving
                                    }
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
                                    value={
                                        form.discountPrice
                                    }
                                    onChange={(event) =>
                                        updateProductField(
                                            "discountPrice",
                                            event.target.value
                                        )
                                    }
                                    disabled={
                                        isSaving
                                    }
                                    placeholder="4499"
                                />
                            </div>
                        </div>

                        {/* =================================================
                            VARIANTS
                        ================================================== */}

                        <div
                            className="
                                rounded-lg
                                border
                                border-border
                                p-5
                            "
                        >
                            <div
                                className="
                                    mb-5
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                "
                            >
                                <div>
                                    <h3
                                        className="
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        Product Variants
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-muted-foreground
                                        "
                                    >
                                        Define the color, size, SKU,
                                        and opening inventory for
                                        each variant.
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={
                                        addVariant
                                    }
                                    disabled={
                                        isSaving
                                    }
                                >
                                    + Add Variant
                                </Button>
                            </div>

                            <div className="space-y-4">

                                {form.variants.map(
                                    (
                                        variant,
                                        index
                                    ) => {

                                        const existingVariant =
                                            product?.variants.find(
                                                (existing) =>
                                                    existing.id ===
                                                    variant.id
                                            );

                                        return (
                                            <div
                                                key={
                                                    variant.id ??
                                                    `new-${index}`
                                                }
                                                className="
                                                    rounded-lg
                                                    border
                                                    border-border
                                                    p-4
                                                "
                                            >
                                                <div
                                                    className="
                                                        mb-4
                                                        flex
                                                        items-center
                                                        justify-between
                                                    "
                                                >
                                                    <h4
                                                        className="
                                                            font-medium
                                                        "
                                                    >
                                                        Variant{" "}
                                                        {index + 1}
                                                    </h4>

                                                    {form.variants
                                                            .length >
                                                        1 && (
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                className="
                                                                text-red-600
                                                                hover:text-red-700
                                                            "
                                                                onClick={() =>
                                                                    removeVariant(
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    isSaving
                                                                }
                                                            >
                                                                Remove
                                                            </Button>
                                                        )}
                                                </div>

                                                <div
                                                    className="
                                                        grid
                                                        grid-cols-1
                                                        gap-4
                                                        md:grid-cols-2
                                                    "
                                                >

                                                    {/* =====================
                                                        COLOR
                                                    ====================== */}

                                                    <div className="space-y-2">
                                                        <label
                                                            className="
                                                                text-sm
                                                                font-medium
                                                            "
                                                        >
                                                            Color
                                                        </label>

                                                        <div
                                                            className="
                                                                flex
                                                                gap-2
                                                            "
                                                        >
                                                            <select
                                                                value={
                                                                    variant.colorId
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    updateVariant(
                                                                        index,
                                                                        "colorId",
                                                                        event
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                disabled={
                                                                    isSaving
                                                                }
                                                                className="
                                                                    min-w-0
                                                                    flex-1
                                                                    rounded-md
                                                                    border
                                                                    border-input
                                                                    bg-background
                                                                    px-3
                                                                    py-2
                                                                    text-sm
                                                                "
                                                            >
                                                                <option value="">
                                                                    Select Color
                                                                </option>

                                                                {colors.map(
                                                                    (
                                                                        color
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                color.id
                                                                            }
                                                                            value={
                                                                                color.id
                                                                            }
                                                                        >
                                                                            {
                                                                                color.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>

                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() =>
                                                                    openCreateColor(
                                                                        index
                                                                    )
                                                                }
                                                                disabled={
                                                                    isSaving
                                                                }
                                                                className="
                                                                    shrink-0
                                                                    whitespace-nowrap
                                                                "
                                                            >
                                                                + New Color
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* =====================
                                                        SIZE
                                                    ====================== */}

                                                    <div className="space-y-2">
                                                        <label
                                                            className="
                                                                text-sm
                                                                font-medium
                                                            "
                                                        >
                                                            Size
                                                        </label>

                                                        <select
                                                            value={
                                                                variant.sizeId
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                updateVariant(
                                                                    index,
                                                                    "sizeId",
                                                                    event
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            disabled={
                                                                isSaving
                                                            }
                                                            className="
                                                                w-full
                                                                rounded-md
                                                                border
                                                                border-input
                                                                bg-background
                                                                px-3
                                                                py-2
                                                                text-sm
                                                            "
                                                        >
                                                            <option value="">
                                                                Select Size
                                                            </option>

                                                            {sizes.map(
                                                                (
                                                                    size
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            size.id
                                                                        }
                                                                        value={
                                                                            size.id
                                                                        }
                                                                    >
                                                                        {
                                                                            size.label
                                                                        }{" "}
                                                                        (
                                                                        {
                                                                            size.numericValue
                                                                        }
                                                                        )
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>

                                                    {/* =====================
                                                        SKU
                                                    ====================== */}

                                                    <div className="space-y-2">
                                                        <label
                                                            className="
                                                                text-sm
                                                                font-medium
                                                            "
                                                        >
                                                            SKU
                                                        </label>

                                                        <Input
                                                            value={
                                                                variant.sku
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                updateVariant(
                                                                    index,
                                                                    "sku",
                                                                    event
                                                                        .target
                                                                        .value
                                                                )
                                                            }
                                                            disabled={
                                                                isSaving
                                                            }
                                                            placeholder="ABAYA-BLK-M"
                                                        />
                                                    </div>

                                                    {/* =====================
                                                        STOCK
                                                    ====================== */}

                                                    <div className="space-y-2">
                                                        <label
                                                            className="
                                                                text-sm
                                                                font-medium
                                                            "
                                                        >
                                                            {variant.id
                                                                ? "Available Stock"
                                                                : "Initial Stock"}
                                                        </label>

                                                        {variant.id ? (
                                                            <div
                                                                className="
                                                                    flex
                                                                    h-10
                                                                    items-center
                                                                    rounded-md
                                                                    border
                                                                    border-input
                                                                    bg-muted
                                                                    px-3
                                                                    text-sm
                                                                "
                                                            >
                                                                {
                                                                    existingVariant?.availableQuantity ??
                                                                    0
                                                                }
                                                            </div>
                                                        ) : (
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                value={
                                                                    variant.initialStock ??
                                                                    0
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    updateVariant(
                                                                        index,
                                                                        "initialStock",
                                                                        Number(
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                }
                                                                disabled={
                                                                    isSaving
                                                                }
                                                                placeholder="0"
                                                            />
                                                        )}
                                                    </div>

                                                </div>

                                                {variant.id && (
                                                    <p
                                                        className="
                                                            mt-3
                                                            text-xs
                                                            text-muted-foreground
                                                        "
                                                    >
                                                        Existing inventory is
                                                        preserved during product
                                                        editing. Use Inventory to
                                                        change stock levels.
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        </div>

                        {/* =================================================
                            ERROR
                        ================================================== */}

                        {errorMessage && (
                            <div
                                className="
                                    rounded-md
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-sm
                                    text-red-700
                                "
                            >
                                {errorMessage}
                            </div>
                        )}

                        {/* =================================================
                            FLAGS
                        ================================================== */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-4
                                md:grid-cols-3
                            "
                        >
                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                "
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        form.featured
                                    }
                                    onChange={(event) =>
                                        updateProductField(
                                            "featured",
                                            event.target.checked
                                        )
                                    }
                                    disabled={
                                        isSaving
                                    }
                                />

                                Featured
                            </label>

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                "
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        form.newArrival
                                    }
                                    onChange={(event) =>
                                        updateProductField(
                                            "newArrival",
                                            event.target.checked
                                        )
                                    }
                                    disabled={
                                        isSaving
                                    }
                                />

                                New Arrival
                            </label>

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                "
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        form.active
                                    }
                                    onChange={(event) =>
                                        updateProductField(
                                            "active",
                                            event.target.checked
                                        )
                                    }
                                    disabled={
                                        isSaving
                                    }
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
                            disabled={
                                isSaving
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={
                                handleSubmit
                            }
                            disabled={
                                isSaving
                            }
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

            {/* =============================================================
                CREATE COLOR DIALOG
            ============================================================= */}

            <Dialog
                open={colorDialogOpen}
                onOpenChange={
                    setColorDialogOpen
                }
            >
                <DialogContent
                    className="sm:max-w-md"
                >
                    <DialogHeader>
                        <DialogTitle>
                            Create New Color
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">

                        {/* =================================================
                            COLOR NAME
                        ================================================== */}

                        <div className="space-y-2">
                            <label
                                htmlFor="new-color-name"
                                className="
                                    text-sm
                                    font-medium
                                "
                            >
                                Color Name
                            </label>

                            <Input
                                id="new-color-name"
                                value={
                                    newColor.name
                                }
                                onChange={(event) =>
                                    setNewColor(
                                        (previous) => ({
                                            ...previous,
                                            name:
                                            event.target
                                                .value,
                                        })
                                    )
                                }
                                disabled={
                                    isCreatingColor
                                }
                                placeholder="Midnight Blue"
                            />

                            <p
                                className="
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                Enter the name you want
                                customers and admins to see.
                            </p>
                        </div>

                        {/* =================================================
                            COLOR PICKER
                        ================================================== */}

                        <div className="space-y-2">
                            <label
                                className="
                                    text-sm
                                    font-medium
                                "
                            >
                                Color
                            </label>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >
                                <label
                                    className="
                                        relative
                                        flex
                                        h-14
                                        w-14
                                        cursor-pointer
                                        overflow-hidden
                                        rounded-lg
                                        border
                                        border-input
                                        shadow-sm
                                    "
                                >
                                    <input
                                        type="color"
                                        value={
                                            newColor.hexCode
                                        }
                                        onChange={(event) =>
                                            setNewColor(
                                                (previous) => ({
                                                    ...previous,
                                                    hexCode:
                                                    event
                                                        .target
                                                        .value,
                                                })
                                            )
                                        }
                                        disabled={
                                            isCreatingColor
                                        }
                                        className="
                                            absolute
                                            inset-0
                                            h-full
                                            w-full
                                            cursor-pointer
                                            opacity-0
                                        "
                                    />

                                    <span
                                        className="
                                            h-full
                                            w-full
                                        "
                                        style={{
                                            backgroundColor:
                                            newColor.hexCode,
                                        }}
                                    />
                                </label>

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        Selected Color
                                    </p>

                                    <p
                                        className="
                                            text-sm
                                            text-muted-foreground
                                        "
                                    >
                                        {
                                            newColor.hexCode.toUpperCase()
                                        }
                                    </p>
                                </div>
                            </div>

                            <p
                                className="
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                Click the color square to
                                choose the color visually.
                            </p>
                        </div>

                        {/* =================================================
                            GENERATED CODE PREVIEW
                        ================================================== */}

                        {newColor.name.trim() && (
                            <div
                                className="
                                    rounded-md
                                    bg-muted
                                    px-3
                                    py-2
                                "
                            >
                                <p
                                    className="
                                        text-xs
                                        text-muted-foreground
                                    "
                                >
                                    Internal color identifier
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-medium
                                    "
                                >
                                    {
                                        generateColorCode(
                                            newColor.name
                                        )
                                    }
                                </p>
                            </div>
                        )}

                        {errorMessage && (
                            <div
                                className="
                                    rounded-md
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-sm
                                    text-red-700
                                "
                            >
                                {errorMessage}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setColorDialogOpen(
                                    false
                                )
                            }
                            disabled={
                                isCreatingColor
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={
                                handleCreateColor
                            }
                            disabled={
                                isCreatingColor
                            }
                        >
                            {isCreatingColor
                                ? "Creating..."
                                : "Create Color"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}