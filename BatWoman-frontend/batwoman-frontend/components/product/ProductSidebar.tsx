"use client";

import { useCategories } from "@/hooks/useCategories";

import { ProductFilters } from "@/services/product.service";

interface ProductSidebarProps {
    filters: ProductFilters;
    onFiltersChange: (filters: ProductFilters) => void;
}

export default function ProductSidebar({
                                           filters,
                                           onFiltersChange,
                                       }: ProductSidebarProps) {

    const { data: categories = [] } = useCategories();

    const updateFilter = (
        changes: Partial<ProductFilters>
    ) => {

        onFiltersChange({
            ...filters,
            ...changes,
        });

    };

    return (

        <aside className="hidden w-64 shrink-0 lg:block">

            {/* Browse */}

            <div>

                <h3 className="mb-6 text-lg font-medium uppercase tracking-wider">
                    Browse By
                </h3>

                <ul className="space-y-4 text-sm text-neutral-700">

                    <li
                        onClick={() =>
                            onFiltersChange({})
                        }
                        className="cursor-pointer hover:text-black"
                    >
                        All Products
                    </li>

                    {categories.map((category) => (

                        <li
                            key={category.id}
                            onClick={() =>
                                updateFilter({
                                    categoryId: category.id,
                                })
                            }
                            className={`cursor-pointer hover:text-black ${
                                filters.categoryId === category.id
                                    ? "font-medium text-black"
                                    : ""
                            }`}
                        >
                            {category.name}
                        </li>

                    ))}

                </ul>

            </div>

            <hr className="my-10 border-neutral-200" />

            {/* Price */}

            <div>

                <h3 className="mb-5 text-lg font-medium uppercase tracking-wider">
                    Price
                </h3>

                <div className="space-y-3 text-sm text-neutral-700">

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={
                                filters.minPrice === undefined &&
                                filters.maxPrice === 3000
                            }
                            onChange={(event) => {

                                if (event.target.checked) {

                                    updateFilter({
                                        minPrice: undefined,
                                        maxPrice: 3000,
                                    });

                                } else {

                                    updateFilter({
                                        minPrice: undefined,
                                        maxPrice: undefined,
                                    });

                                }

                            }}
                        />

                        Under ₹3,000

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={
                                filters.minPrice === 3000 &&
                                filters.maxPrice === 5000
                            }
                            onChange={(event) => {

                                if (event.target.checked) {

                                    updateFilter({
                                        minPrice: 3000,
                                        maxPrice: 5000,
                                    });

                                } else {

                                    updateFilter({
                                        minPrice: undefined,
                                        maxPrice: undefined,
                                    });

                                }

                            }}
                        />

                        ₹3,000 - ₹5,000

                    </label>

                    <label className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            checked={
                                filters.minPrice === 5000 &&
                                filters.maxPrice === undefined
                            }
                            onChange={(event) => {

                                if (event.target.checked) {

                                    updateFilter({
                                        minPrice: 5000,
                                        maxPrice: undefined,
                                    });

                                } else {

                                    updateFilter({
                                        minPrice: undefined,
                                        maxPrice: undefined,
                                    });

                                }

                            }}
                        />

                        Above ₹5,000

                    </label>

                </div>

            </div>

            <hr className="my-10 border-neutral-200" />

            {/* Fabric */}

            <div>

                <h3 className="mb-5 text-lg font-medium uppercase tracking-wider">
                    Fabric
                </h3>

                <div className="space-y-3 text-sm text-neutral-700">

                    {[
                        "Nida",
                        "Linen",
                        "Crepe",
                        "Cotton",
                    ].map((fabric) => (

                        <label
                            key={fabric}
                            className="flex items-center gap-3"
                        >

                            <input
                                type="checkbox"
                                checked={
                                    filters.fabric?.toLowerCase() ===
                                    fabric.toLowerCase()
                                }
                                onChange={(event) => {

                                    updateFilter({
                                        fabric: event.target.checked
                                            ? fabric
                                            : undefined,
                                    });

                                }}
                            />

                            {fabric}

                        </label>

                    ))}

                </div>

            </div>

            <hr className="my-10 border-neutral-200" />

            {/* Color */}

            <div>

                <h3 className="mb-5 text-lg font-medium uppercase tracking-wider">
                    Color
                </h3>

                <div className="flex flex-wrap gap-3">

                    {/* Color filtering intentionally left untouched
                        until the actual backend color values are confirmed. */}

                    <button
                        type="button"
                        className="h-6 w-6 rounded-full border bg-black"
                        aria-label="Black"
                    />

                    <button
                        type="button"
                        className="h-6 w-6 rounded-full border bg-white"
                        aria-label="White"
                    />

                    <button
                        type="button"
                        className="h-6 w-6 rounded-full border bg-gray-400"
                        aria-label="Gray"
                    />

                    <button
                        type="button"
                        className="h-6 w-6 rounded-full border bg-green-700"
                        aria-label="Green"
                    />

                    <button
                        type="button"
                        className="h-6 w-6 rounded-full border bg-yellow-200"
                        aria-label="Yellow"
                    />

                </div>

            </div>

        </aside>

    );
}