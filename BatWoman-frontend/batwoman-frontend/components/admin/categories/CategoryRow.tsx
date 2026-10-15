"use client";

import { SquarePen, Trash2, Tag } from "lucide-react";

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
        <article className="flex min-w-0 flex-col gap-4 bg-[#FFFDFA] p-4 transition-colors duration-200 hover:bg-[#FBF8F3] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5">
            {/* Category details */}
            <div className="flex min-w-0 flex-1 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6D8C5] bg-[#F5EDE2] text-[#8D6B43]">
                    <Tag size={18} strokeWidth={1.7} />
                </div>

                <div className="min-w-0 flex-1 space-y-1.5">
                    <h3 className="break-words font-[var(--font-playfair)] text-lg font-medium text-[#30271F] sm:text-xl">
                        {category.name}
                    </h3>

                    <p className="break-words text-xs leading-relaxed text-[#8B8174] sm:text-sm">
                        {category.description || "No description provided."}
                    </p>

                    <p className="break-all font-mono text-[10px] text-[#A09484] sm:text-xs">
                        /{category.slug}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#F0E8DE] pt-3 sm:border-0 sm:pt-0">
                <button
                    type="button"
                    onClick={() => onEdit(category)}
                    aria-label={`Edit ${category.name}`}
                    title="Edit category"
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#E5D8C6] bg-white px-3 text-xs font-medium text-[#72583A] transition-colors hover:border-[#CBB18D] hover:bg-[#F5EDE2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A18A6E]/40 sm:px-4 sm:text-sm"
                >
                    <SquarePen size={15} strokeWidth={1.8} />
                    <span>Edit</span>
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(category)}
                    aria-label={`Delete ${category.name}`}
                    title="Delete category"
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#EAD1CC] bg-white px-3 text-xs font-medium text-[#A34E3E] transition-colors hover:bg-[#F8EBE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A34E3E]/30 sm:px-4 sm:text-sm"
                >
                    <Trash2 size={15} strokeWidth={1.8} />
                    <span>Delete</span>
                </button>
            </div>
        </article>
    );
}