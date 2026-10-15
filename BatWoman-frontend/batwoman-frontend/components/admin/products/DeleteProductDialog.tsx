"use client";

import {
    AlertTriangle,
    Package,
    Trash2,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ProductSummary {
    id: string;
    name: string;
}

interface DeleteProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: ProductSummary | null;
    onDelete: () => void;
    isLoading?: boolean;
}

export default function DeleteProductDialog({
                                                open,
                                                onOpenChange,
                                                product,
                                                onDelete,
                                                isLoading = false,
                                            }: DeleteProductDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90dvh] overflow-y-auto border-[#E7DDD0] bg-[#FFFDFA] p-5 text-[#30271F] sm:max-w-md sm:rounded-2xl sm:p-7">
                <DialogHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-[#EAD1CC] bg-[#F8EBE8] text-[#A34E3E]">
                        <AlertTriangle size={23} strokeWidth={1.7} />
                    </div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A18A6E]">
                        Store management
                    </p>

                    <DialogTitle className="font-[var(--font-playfair)] text-2xl font-medium text-[#30271F] sm:text-3xl">
                        Delete Product
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-relaxed text-[#8B8174]">
                        Are you sure you want to delete this product? Review the
                        details below before proceeding.
                    </DialogDescription>
                </DialogHeader>

                {product && (
                    <div className="rounded-xl border border-[#EAD1CC] bg-[#FCF5F3] p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#A34E3E]">
                                <Package size={19} strokeWidth={1.7} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="break-words text-sm font-semibold text-[#493A2B]">
                                    {product.name}
                                </p>

                                <p className="mt-1 break-all font-mono text-[10px] text-[#A09484]">
                                    Product ID: {product.id}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-2.5 rounded-xl border border-[#EAD1CC] bg-[#F8EBE8]/60 p-3.5">
                    <AlertTriangle
                        size={15}
                        className="mt-0.5 shrink-0 text-[#A34E3E]"
                    />

                    <p className="text-xs leading-relaxed text-[#913F32]">
                        This action cannot be undone. Check any associated variants,
                        inventory, and order history before deleting the product.
                    </p>
                </div>

                <DialogFooter className="flex-col-reverse gap-2 border-t border-[#F0E8DE] pt-4 sm:flex-row sm:gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="w-full rounded-xl border-[#E5D8C6] bg-white text-[#5F5142] hover:bg-[#F8F3EC] sm:w-auto"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={onDelete}
                        disabled={isLoading || !product}
                        className="w-full rounded-xl bg-[#A34E3E] text-white hover:bg-[#873B2E] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        <Trash2 size={15} className="mr-2" />

                        {isLoading ? "Deleting..." : "Delete Product"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}