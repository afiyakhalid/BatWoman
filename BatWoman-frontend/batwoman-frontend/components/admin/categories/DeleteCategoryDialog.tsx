"use client";

import {
    AlertTriangle,
    Trash2,
    ShieldAlert,
} from "lucide-react";

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

import type { Category } from "@/services/adminCategory.service";

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
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-h-[90dvh] overflow-y-auto border-[#E7DDD0] bg-[#FFFDFA] p-5 text-[#30271F] sm:max-w-md sm:rounded-2xl sm:p-7">
                <AlertDialogHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-[#EAD1CC] bg-[#F8EBE8] text-[#A34E3E]">
                        <AlertTriangle size={23} strokeWidth={1.7} />
                    </div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18A6E]">
                        Store management
                    </p>

                    <AlertDialogTitle className="font-[var(--font-playfair)] text-2xl font-medium text-[#30271F] sm:text-3xl">
                        Delete Category
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-sm leading-relaxed text-[#8B8174]">
                        Are you sure you want to delete this category? Review
                        the details below before proceeding.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {category && (
                    <div className="rounded-xl border border-[#EAD1CC] bg-[#FCF5F3] p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#A34E3E]">
                                <Trash2 size={17} strokeWidth={1.7} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="break-words text-sm font-semibold text-[#493A2B]">
                                    {category.name}
                                </p>

                                {category.description && (
                                    <p className="mt-1 break-words text-xs leading-relaxed text-[#8B8174]">
                                        {category.description}
                                    </p>
                                )}

                                {category.slug && (
                                    <p className="mt-2 break-all font-mono text-[10px] text-[#A09484]">
                                        /{category.slug}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {errorMessage ? (
                    <div
                        role="alert"
                        className="rounded-xl border border-[#EAD1CC] bg-[#F8EBE8] p-4"
                    >
                        <div className="flex items-start gap-2.5">
                            <ShieldAlert
                                size={17}
                                className="mt-0.5 shrink-0 text-[#A34E3E]"
                            />

                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#913F32]">
                                    Unable to delete category
                                </p>

                                <p className="mt-1 break-words text-xs leading-relaxed text-[#A34E3E]">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-xs leading-relaxed text-[#A34E3E]">
                        This action cannot be undone. Make sure the category
                        is no longer needed before continuing.
                    </p>
                )}

                <AlertDialogFooter className="flex-col-reverse gap-2 border-t border-[#F0E8DE] pt-4 sm:flex-row sm:gap-3">
                    <AlertDialogCancel
                        disabled={isLoading}
                        className="mt-0 w-full rounded-xl border-[#E5D8C6] bg-white text-[#5F5142] hover:bg-[#F8F3EC] sm:w-auto"
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isLoading || !category}
                        onClick={(event) => {
                            event.preventDefault();
                            if (!isLoading && category) {
                                onDelete();
                            }
                        }}
                        className="w-full rounded-xl bg-[#A34E3E] text-white hover:bg-[#873B2E] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        <Trash2 size={15} className="mr-2" />

                        {isLoading ? "Deleting..." : "Delete Category"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}