"use client";

import { SquarePen, Trash2 } from "lucide-react";

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
}
interface CategoryRowProps {

    category: Category;

    onEdit: (category: Category) => void;

    onDelete: (category: Category) => void;

}

export default function CategoryRow({

    category,

    onEdit,

    onDelete,

}: CategoryRowProps) {

    return (

        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-neutral-300 hover:shadow-sm">

            <div className="space-y-2">

                <h3 className="text-lg font-semibold">

                    {category.name}

                </h3>

                <p className="text-sm text-neutral-500">

                    {category.description}

                </p>

            </div>

            <div className="flex items-center gap-3">

                <button
                    type="button"
                    onClick={() => onEdit(category)}
                    className="rounded-xl border border-neutral-200 p-3 transition hover:bg-neutral-100"
                >

                    <SquarePen size={18} />

                </button>

                <button
                    type="button"
                    onClick={() => onDelete(category)}
                    className="rounded-xl border border-red-200 p-3 text-red-600 transition hover:bg-red-50"
                >

                    <Trash2 size={18} />

                </button>

            </div>

        </div>

    );

}