"use client";

import { useEffect, useState } from "react";

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

import { Inventory } from "@/services/adminInventory.service";
import { useRestockInventory } from "@/hooks/useRestockInventory";

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
    const mutation = useRestockInventory();

    useEffect(() => {
        if (open) {
            setQuantity(1);
        }
    }, [open]);

    if (!inventory) {
        return null;
    }

    const selectedInventory = inventory;

    function handleRestock() {
        mutation.mutate(
            {
                productId: selectedInventory.productId,
                quantity,
            },
            {
                onSuccess: () => {
                    onOpenChange(false);
                },
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Restock Inventory</DialogTitle>
                    <DialogDescription>
                        Increase stock for
                        <span className="ml-1 font-semibold">
                            {selectedInventory.productName}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(Number(e.target.value))
                        }
                    />
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleRestock}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Restocking..." : "Restock"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}