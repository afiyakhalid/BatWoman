"use client";

import { Layers3, FolderOpen } from "lucide-react";

import CategoryRow, { type Category } from "./CategoryRow";

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
            <div className="flex min-w-0 flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5D8C6] bg-[#FFFDFA] px-5 py-14 text-center sm:py-20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E6D8C5] bg-[#F5EDE2] text-[#8D6B43]">
                    <FolderOpen size={25} strokeWidth={1.5} />
                </div>

                <h2 className="mt-5 font-[var(--font-playfair)] text-2xl font-medium text-[#30271F] sm:text-3xl">
                    No Categories Found
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#8B8174]">
                    Your collection has no categories yet. Create your first
                    category to start organizing your products.
                </p>
            </div>
        );
    }

    return (
        <section className="min-w-0 overflow-hidden rounded-2xl border border-[#E7DDD0] bg-[#FFFDFA] shadow-[0_2px_8px_rgba(70,50,30,0.04)]">
            {/* Table heading — desktop only */}
            <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)_150px] items-center gap-5 border-b border-[#E7DDD0] bg-[#F8F3EC] px-6 py-4 lg:grid xl:px-8">
                <div className="flex items-center gap-2">
                    <Layers3 size={15} className="text-[#A18A6E]" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#796954]">
                        Category
                    </p>
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#796954]">
                    Description
                </p>

                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[#796954]">
                    Actions
                </p>
            </div>

            {/* Category rows */}
            <div className="divide-y divide-[#F0E8DE]">
                {categories.map((category) => (
                    <div key={category.id} className="min-w-0">
                        <CategoryRow
                            category={category}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E7DDD0] bg-[#FBF8F3] px-4 py-3 sm:px-6">
                <p className="text-[11px] text-[#8B8174] sm:text-xs">
                    Category collection
                </p>

                <p className="text-[11px] font-medium text-[#796954] sm:text-xs">
                    {categories.length}{" "}
                    {categories.length === 1 ? "category" : "categories"}
                </p>
            </div>
        </section>
    );
}