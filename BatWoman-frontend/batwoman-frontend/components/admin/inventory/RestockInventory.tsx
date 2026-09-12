"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Inventory,
} from "@/services/adminInventory.service";

import {
    useRestockInventory,
} from "@/hooks/useRestockInventory";

interface RestockInventoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    inventory: Inventory | null;
}

export default function RestockInventoryDialog({
                                                   open,
                                                   onOpenChange,
                                                   inventory,
                                               }: RestockInventoryDialogProps) {

    const [quantity, setQuantity] =
        useState(1);

    const mutation =
        useRestockInventory();

    useEffect(() => {

        if (open) {
            setQuantity(1);
        }

    }, [open]);

    function handleRestock() {

        if (!inventory) {
            return;
        }

        if (quantity < 1) {
            return;
        }

        mutation.mutate(
            {
                variantId:
                inventory.variantId,

                quantity,
            },
            {
                onSuccess: () => {

                    onOpenChange(
                        false
                    );

                },
            }
        );
    }

    if (!inventory) {
        return null;
    }

    return (

        <Dialog
            open={
                open
            }
            onOpenChange={
                onOpenChange
            }
        >

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        Restock Inventory
                    </DialogTitle>

                    <DialogDescription>

                        Increase stock for

                        <span className="ml-1 font-semibold">
                            {
                                inventory.productName
                            }
                        </span>

                        <span className="ml-1">
                            (
                            {
                                inventory.color
                            }
                            {" / "}
                            {
                                inventory.size
                            }
                            )
                        </span>

                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-4">

                    <div>

                        <p className="text-sm text-muted-foreground">
                            SKU
                        </p>

                        <p className="font-medium">
                            {
                                inventory.sku
                            }
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Current Available Stock
                        </p>

                        <p className="font-medium">
                            {
                                inventory.availableQuantity
                            }
                        </p>

                    </div>

                    <div className="space-y-2">

                        <label
                            htmlFor="restock-quantity"
                            className="text-sm font-medium"
                        >
                            Quantity
                        </label>

                        <Input
                            id="restock-quantity"
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(
                                event
                            ) =>
                                setQuantity(
                                    Math.max(
                                        1,
                                        Number(
                                            event.target.value
                                        ) || 1
                                    )
                                )
                            }
                            disabled={
                                mutation.isPending
                            }
                        />

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(
                                false
                            )
                        }
                        disabled={
                            mutation.isPending
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={
                            handleRestock
                        }
                        disabled={
                            mutation.isPending ||
                            quantity < 1
                        }
                    >
                        {
                            mutation.isPending
                                ? "Restocking..."
                                : "Restock"
                        }
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );
}