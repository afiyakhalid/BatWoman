"use client";

import { useState } from "react";
import { AlertTriangle, Minus, Plus, Package } from "lucide-react";

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

import { useAdjustInventory } from "@/hooks/useAdjustInventory";

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
    const [quantity, setQuantity] = useState(1);

    const [adjustmentType, setAdjustmentType] =
        useState<InventoryAdjustmentType>("INCREASE");

    const mutation = useAdjustInventory();

    function handleDialogOpenChange(nextOpen: boolean) {
        if (!nextOpen) {
            setQuantity(1);
            setAdjustmentType("INCREASE");
        }

        onOpenChange(nextOpen);
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
            quantity > inventory.availableQuantity
        ) {
            return;
        }

        mutation.mutate(
            {
                variantId: inventory.variantId,
                quantity,
                adjustmentType,
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            }
        );
    }

    if (!inventory) {
        return null;
    }

    const isDecrease = adjustmentType === "DECREASE";

    const exceedsAvailableStock =
        isDecrease &&
        quantity > inventory.availableQuantity;

    return (
        <Dialog
            open={open}
            onOpenChange={handleDialogOpenChange}
        >
            <DialogContent className="max-w-md gap-0 overflow-hidden rounded-2xl border border-[#EAE3D8] bg-[#FFFDF9] p-0 text-[#3D3028] shadow-[0_20px_60px_rgba(61,48,40,0.15)]">
                <div className="border-b border-[#EAE3D8] bg-[#F7F2EA] px-6 py-5">
                    <DialogHeader className="space-y-2 text-left">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E5D8C4] bg-white text-[#94764C]">
                                <Package
                                    size={21}
                                    strokeWidth={1.7}
                                />
                            </div>

                            <div>
                                <DialogTitle className="text-lg font-semibold tracking-tight text-[#3D3028]">
                                    Adjust Inventory
                                </DialogTitle>

                                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#94764C]">
                                    Stock Management
                                </p>
                            </div>
                        </div>

                        <DialogDescription className="pt-2 text-sm leading-6 text-[#75675C]">
                            {isDecrease
                                ? "Decrease stock for"
                                : "Increase stock for"}

                            <span className="ml-1 font-semibold text-[#3D3028]">
                                {inventory.productName}
                            </span>

                            <span className="ml-1 text-[#8A7A6C]">
                                ({inventory.color} / {inventory.size})
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="space-y-5 px-6 py-5">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-[#EAE3D8] bg-white p-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8A7A6C]">
                                SKU
                            </p>

                            <p className="mt-2 break-all text-sm font-medium text-[#3D3028]">
                                {inventory.sku}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#EAE3D8] bg-white p-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8A7A6C]">
                                Available Stock
                            </p>

                            <p className="mt-2 text-2xl font-semibold tabular-nums text-[#3D3028]">
                                {inventory.availableQuantity}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#75675C]">
                            Adjustment Type
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setAdjustmentType("INCREASE")}
                                disabled={mutation.isPending}
                                aria-pressed={!isDecrease}
                                className={`flex h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] disabled:cursor-not-allowed disabled:opacity-50 ${
                                    !isDecrease
                                        ? "border-[#94764C] bg-[#94764C] text-white"
                                        : "border-[#E5DCCE] bg-white text-[#59483A] hover:bg-[#F7F2EA]"
                                }`}
                            >
                                <Plus size={16} />
                                Increase
                            </button>

                            <button
                                type="button"
                                onClick={() => setAdjustmentType("DECREASE")}
                                disabled={
                                    mutation.isPending ||
                                    inventory.availableQuantity === 0
                                }
                                aria-pressed={isDecrease}
                                className={`flex h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A65] disabled:cursor-not-allowed disabled:opacity-50 ${
                                    isDecrease
                                        ? "border-[#94764C] bg-[#94764C] text-white"
                                        : "border-[#E5DCCE] bg-white text-[#59483A] hover:bg-[#F7F2EA]"
                                }`}
                            >
                                <Minus size={16} />
                                Decrease
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="inventory-adjustment-quantity"
                            className="text-xs font-semibold uppercase tracking-[0.14em] text-[#75675C]"
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
                                const value = Number(event.target.value);

                                if (
                                    !Number.isFinite(value) ||
                                    value < 1
                                ) {
                                    setQuantity(1);
                                    return;
                                }

                                setQuantity(Math.floor(value));
                            }}
                            disabled={mutation.isPending}
                            className="h-12 rounded-xl border-[#E5DCCE] bg-white text-[#3D3028] focus-visible:border-[#B99A65] focus-visible:ring-[#B99A65]/20"
                        />

                        {exceedsAvailableStock && (
                            <div className="flex items-start gap-2 rounded-xl border border-[#E8C9C5] bg-[#F9EDEA] p-3 text-sm text-[#9B5148]">
                                <AlertTriangle
                                    size={17}
                                    className="mt-0.5 shrink-0"
                                />

                                <p>
                                    Cannot decrease stock by more than the
                                    current available quantity of{" "}
                                    {inventory.availableQuantity}.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="flex-col-reverse gap-2 border-t border-[#EAE3D8] bg-[#FAF7F2] px-6 py-4 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleDialogOpenChange(false)}
                        disabled={mutation.isPending}
                        className="h-11 rounded-xl border-[#E0D5C5] bg-white px-5 text-[#59483A] hover:bg-[#F5EFE5] hover:text-[#3D3028]"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleAdjustment}
                        disabled={
                            mutation.isPending ||
                            quantity < 1 ||
                            exceedsAvailableStock
                        }
                        className="h-11 rounded-xl border border-[#94764C] bg-[#94764C] px-5 text-white hover:bg-[#806442] disabled:opacity-50"
                    >
                        {mutation.isPending
                            ? "Updating..."
                            : isDecrease
                                ? "Decrease Stock"
                                : "Increase Stock"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}