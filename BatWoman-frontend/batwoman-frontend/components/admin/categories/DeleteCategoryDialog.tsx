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

import { Category } from "@/services/adminCategory.service";

interface DeleteCategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: Category | null;
    onDelete: () => void;
    isLoading?: boolean;
    error?: unknown;
}

function getErrorMessage(error: unknown): string | null {
    if (!error) {
        return null;
    }

    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
    ) {
        const response = (
            error as {
                response?: {
                    data?: unknown;
                };
            }
        ).response;

        const data = response?.data;

        if (typeof data === "string") {
            return data;
        }

        if (
            typeof data === "object" &&
            data !== null &&
            "message" in data
        ) {
            const message = (
                data as {
                    message?: unknown;
                }
            ).message;

            if (typeof message === "string") {
                return message;
            }
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Unable to delete this category.";
}

export default function DeleteCategoryDialog({
                                                 open,
                                                 onOpenChange,
                                                 category,
                                                 onDelete,
                                                 isLoading = false,
                                                 error,
                                             }: DeleteCategoryDialogProps) {
    const errorMessage = getErrorMessage(error);

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
                        <span className="block">
                            Are you sure you want to delete this category?
                        </span>

                        {category && (
                            <span className="block rounded-xl border border-red-200 bg-red-50 p-4">
                                <span className="block font-semibold text-black">
                                    {category.name}
                                </span>

                                {category.description && (
                                    <span className="mt-1 block text-sm">
                                        {category.description}
                                    </span>
                                )}
                            </span>
                        )}

                        {errorMessage ? (
                            <span className="block rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                                <span className="block font-semibold">
                                    Cannot delete this category.
                                </span>

                                <span className="mt-1 block">
                                    {errorMessage}
                                </span>
                            </span>
                        ) : (
                            <span className="block font-medium text-red-600">
                                This action cannot be undone.
                            </span>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={onDelete}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {isLoading
                            ? "Deleting..."
                            : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}