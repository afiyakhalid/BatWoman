"use client";

import {
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
    InventoryAdjustmentType,
} from "@/services/adminInventory.service";

import {
    useAdjustInventory,
} from "@/hooks/useAdjustInventory";

interface RestockInventoryDialogProps {

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;

    inventory: Inventory | null;

}

export default function RestockInventoryDialog({

                                                   open,

                                                   onOpenChange,

                                                   inventory,

                                               }: RestockInventoryDialogProps) {

    const [quantity, setQuantity] =
        useState(1);

    const [adjustmentType, setAdjustmentType] =
        useState<InventoryAdjustmentType>(
            "INCREASE"
        );

    const mutation =
        useAdjustInventory();

    function handleDialogOpenChange(
        nextOpen: boolean
    ) {

        if (!nextOpen) {

            setQuantity(1);

            setAdjustmentType(
                "INCREASE"
            );

        }

        onOpenChange(
            nextOpen
        );

    }

    function handleAdjustment() {

        if (!inventory) {
            return;
        }

        if (quantity < 1) {
            return;
        }

        if (
            adjustmentType === "DECREASE" &&
            quantity >
            inventory.availableQuantity
        ) {
            return;
        }

        mutation.mutate(

            {
                variantId:
                inventory.variantId,

                quantity,

                adjustmentType,

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

    const isDecrease =
        adjustmentType === "DECREASE";

    const exceedsAvailableStock =
        isDecrease &&
        quantity >
        inventory.availableQuantity;

    return (

        <Dialog
            open={open}
            onOpenChange={
                handleDialogOpenChange
            }
        >

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        Adjust Inventory
                    </DialogTitle>

                    <DialogDescription>

                        {isDecrease
                            ? "Decrease stock for"
                            : "Increase stock for"
                        }

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

                        <p className="text-sm font-medium">
                            Adjustment
                        </p>

                        <div className="grid grid-cols-2 gap-2">

                            <Button
                                type="button"
                                variant={
                                    adjustmentType ===
                                    "INCREASE"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() =>
                                    setAdjustmentType(
                                        "INCREASE"
                                    )
                                }
                                disabled={
                                    mutation.isPending
                                }
                            >
                                Increase
                            </Button>

                            <Button
                                type="button"
                                variant={
                                    adjustmentType ===
                                    "DECREASE"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() =>
                                    setAdjustmentType(
                                        "DECREASE"
                                    )
                                }
                                disabled={
                                    mutation.isPending ||
                                    inventory.availableQuantity ===
                                    0
                                }
                            >
                                Decrease
                            </Button>

                        </div>

                    </div>

                    <div className="space-y-2">

                        <label
                            htmlFor="inventory-adjustment-quantity"
                            className="text-sm font-medium"
                        >
                            Quantity
                        </label>

                        <Input
                            id="inventory-adjustment-quantity"
                            type="number"
                            min={1}
                            max={
                                isDecrease
                                    ? inventory.availableQuantity
                                    : undefined
                            }
                            value={quantity}
                            onChange={(event) => {

                                const value =
                                    Number(
                                        event.target.value
                                    );

                                if (
                                    !Number.isFinite(
                                        value
                                    ) ||
                                    value < 1
                                ) {

                                    setQuantity(1);

                                    return;

                                }

                                setQuantity(
                                    Math.floor(value)
                                );

                            }}
                            disabled={
                                mutation.isPending
                            }
                        />

                        {exceedsAvailableStock && (

                            <p className="text-sm text-red-600">

                                Cannot decrease stock by more than the
                                current available quantity of{" "}

                                {
                                    inventory.availableQuantity
                                }.

                            </p>

                        )}

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            handleDialogOpenChange(
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
                            handleAdjustment
                        }
                        disabled={
                            mutation.isPending ||
                            quantity < 1 ||
                            exceedsAvailableStock
                        }
                    >

                        {mutation.isPending

                            ? "Updating..."

                            : isDecrease
                                ? "Decrease Stock"
                                : "Increase Stock"

                        }

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}