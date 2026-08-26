"use client";

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

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-md">

                <DialogHeader>

                    <DialogTitle className="font-[var(--font-playfair)] text-3xl">

                        Delete Product

                    </DialogTitle>

                    <DialogDescription>

                        {product
                            ? `Are you sure you want to delete "${product.name}"?`
                            : "Are you sure you want to delete this product?"}

                        <br />
                        <br />

                        This action cannot be undone.

                    </DialogDescription>

                </DialogHeader>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Deleting..."
                            : "Delete Product"}
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}