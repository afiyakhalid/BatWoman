"use client";

import { useMemo, useState } from "react";

import InventorySummaryCards from "@/components/admin/inventory/InventorySummaryCards";
import InventoryTable from "@/components/admin/inventory/InventoryTable";
import InventoryToolbar from "@/components/admin/inventory/InventoryToolbar";
import RestockInventoryDialog from "@/components/admin/inventory/RestockInventory";

import { useAdminInventory } from "@/hooks/useAdminInventory";
import { Inventory } from "@/services/adminInventory.service";

export default function InventoryPage() {
    const { data: inventory = [], isLoading } = useAdminInventory();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");

    const [selectedInventory, setSelectedInventory] =
        useState<Inventory | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const filteredInventory = useMemo(() => {
        return inventory.filter((item) => {
            const matchesSearch = item.productName
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesFilter = (() => {
                switch (filter) {
                    case "IN_STOCK":
                        return item.availableQuantity > 10;

                    case "LOW_STOCK":
                        return (
                            item.availableQuantity > 0 &&
                            item.availableQuantity <= 10
                        );

                    case "OUT_OF_STOCK":
                        return item.availableQuantity === 0;

                    default:
                        return true;
                }
            })();

            return matchesSearch && matchesFilter;
        });
    }, [inventory, search, filter]);

    function handleRestock(item: Inventory) {
        setSelectedInventory(item);
        setDialogOpen(true);
    }

    if (isLoading) {
        return <div className="p-8">Loading inventory...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-[var(--font-playfair)] text-5xl">
                    Inventory
                </h1>
                <p className="mt-3 text-neutral-500">
                    Monitor stock levels and restock products.
                </p>
            </div>

            <InventorySummaryCards inventory={inventory} />

            <InventoryToolbar
                search={search}
                onSearchChange={setSearch}
                filter={filter}
                onFilterChange={setFilter}
            />

            <InventoryTable
                inventory={filteredInventory}
                onRestock={handleRestock}
            />

            <RestockInventoryDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                inventory={selectedInventory}
            />
        </div>
    );
}