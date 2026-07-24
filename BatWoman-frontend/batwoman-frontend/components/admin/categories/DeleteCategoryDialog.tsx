"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Category } from "./CategoryRow";

interface DeleteCategoryDialogProps {

    open: boolean;

    onOpenChange: (open: boolean) => void;

    category: Category | null;

    onDelete: () => void;

    isLoading?: boolean;

}

export default function DeleteCategoryDialog({

    open,

    onOpenChange,

    category,

    onDelete,

    isLoading = false,

}: DeleteCategoryDialogProps) {

    return (

        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle className="font-[var(--font-playfair)] text-3xl">

                        Delete Category

                    </AlertDialogTitle>

                    <AlertDialogDescription className="space-y-4 text-neutral-600">

                        <p>

                            Are you sure you want to delete this category?

                        </p>

                        {category && (

                            <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                                <p className="font-semibold text-black">

                                    {category.name}

                                </p>

                                <p className="mt-1 text-sm">

                                    {category.description}

                                </p>

                            </div>

                        )}

                        <p className="text-red-600 font-medium">

                            This action cannot be undone.

                        </p>

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>

                        Cancel

                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={onDelete}
                        className="bg-red-600 hover:bg-red-700"
                    >

                        {

                            isLoading

                                ? "Deleting..."

                                : "Delete"

                        }

                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );

}