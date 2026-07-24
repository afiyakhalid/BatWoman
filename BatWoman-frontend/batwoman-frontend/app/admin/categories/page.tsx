"use client";

import { useMemo, useState } from "react";

import CategoryToolbar from "@/components/admin/categories/CategoryToolbar";
import CategoryTable from "@/components/admin/categories/CategoryTable";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import DeleteCategoryDialog from "@/components/admin/categories/DeleteCategoryDialog";

import { Category } from "@/services/adminCategory.service";

import { useCategories } from "@/hooks/useCategories";
import { useCreateCategory } from "@/hooks/useCreateCategory";
import { useUpdateCategory } from "@/hooks/useUpdateCategory";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";

export default function CategoriesPage() {

    const [search, setSearch] = useState("");

    const [formOpen, setFormOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] =
        useState<Category | null>(null);

    const {
        data: categories = [],
        isLoading,
    } = useCategories();

    const createCategory = useCreateCategory();

    const updateCategory = useUpdateCategory();

    const deleteCategory = useDeleteCategory();

    const filteredCategories = useMemo(() => {

        return categories.filter((category) =>
            category.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [categories, search]);

    function handleAddCategory() {

        setSelectedCategory(null);

        setFormOpen(true);

    }

    function handleEdit(category: Category) {

        setSelectedCategory(category);

        setFormOpen(true);

    }

    function handleDelete(category: Category) {

        setSelectedCategory(category);

        setDeleteOpen(true);

    }

    function handleSave(
        name: string,
        description: string
    ) {

        if (selectedCategory) {

            updateCategory.mutate({

                id: selectedCategory.id,

                request: {
                    name,
                    description,
                },

            });

        } else {

            createCategory.mutate({

                name,
                description,

            });

        }

        setFormOpen(false);

    }

    function confirmDelete() {

        if (!selectedCategory) return;

        deleteCategory.mutate(selectedCategory.id);

        setDeleteOpen(false);

    }

    if (isLoading) {

        return (

            <div className="p-8">

                Loading categories...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <CategoryToolbar

                search={search}

                onSearchChange={setSearch}

                onAddCategory={handleAddCategory}

            />

            <CategoryTable

                categories={filteredCategories}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <CategoryForm

                open={formOpen}

                onOpenChange={setFormOpen}

                category={selectedCategory}

                onSave={handleSave}

            />

            <DeleteCategoryDialog

                open={deleteOpen}

                onOpenChange={setDeleteOpen}

                category={selectedCategory}

                onDelete={confirmDelete}

                isLoading={deleteCategory.isPending}

            />

        </div>

    );

}