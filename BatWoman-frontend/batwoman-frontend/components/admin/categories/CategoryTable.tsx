"use client";

import CategoryRow, { Category } from "./CategoryRow";

interface CategoryTableProps {

    categories: Category[];

    onEdit: (category: Category) => void;

    onDelete: (category: Category) => void;

}

export default function CategoryTable({

    categories,

    onEdit,

    onDelete,

}: CategoryTableProps) {

    if (categories.length === 0) {

        return (

            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white py-20 text-center">

                <h2 className="text-2xl font-semibold">

                    No Categories Found

                </h2>

                <p className="mt-3 text-neutral-500">

                    Create your first category to start organizing products.

                </p>

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">

            {/* Header */}

            <div className="grid grid-cols-[2fr_4fr_180px] border-b border-neutral-200 bg-neutral-50 px-8 py-5">

                <p className="font-semibold">

                    Category

                </p>

                <p className="font-semibold">

                    Description

                </p>

                <p className="text-center font-semibold">

                    Actions

                </p>

            </div>

            {/* Rows */}

            <div>

                {categories.map((category) => (

                    <div
                        key={category.id}
                        className="border-b border-neutral-100 last:border-none"
                    >

                        <CategoryRow
                            category={category}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />

                    </div>

                ))}

            </div>

        </div>

    );

}