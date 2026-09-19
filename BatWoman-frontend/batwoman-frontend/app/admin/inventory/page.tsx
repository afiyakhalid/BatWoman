"use client";

import {
    useEffect,
    useState,
} from "react";

import InventorySummaryCards from "@/components/admin/inventory/InventorySummaryCards";
import InventoryTable from "@/components/admin/inventory/InventoryTable";
import InventoryToolbar from "@/components/admin/inventory/InventoryToolbar";
import RestockInventoryDialog from "@/components/admin/inventory/RestockInventory";

import {
    useAdminInventory,
} from "@/hooks/useAdminInventory";

import {
    Inventory,
} from "@/services/adminInventory.service";

export default function InventoryPage() {

    const [search, setSearch] =
        useState("");

    const [debouncedSearch, setDebouncedSearch] =
        useState("");

    const [filter, setFilter] =
        useState("ALL");

    const [selectedInventory, setSelectedInventory] =
        useState<Inventory | null>(
            null
        );

    const [dialogOpen, setDialogOpen] =
        useState(false);

    useEffect(() => {

        const timer =
            setTimeout(() => {
                setDebouncedSearch(search);
            }, 300);

        return () =>
            clearTimeout(timer);

    }, [search]);

    const {
        data,
        isLoading,
        isError,
    } = useAdminInventory({

        search: debouncedSearch,

        filter,

        page: 0,

        size: 100,

    });

    function handleRestock(
        item: Inventory
    ) {

        setSelectedInventory(
            item
        );

        setDialogOpen(
            true
        );

    }

    if (isLoading) {

        return (
            <div className="p-8">
                Loading inventory...
            </div>
        );

    }

    if (isError) {

        return (
            <div className="p-8 text-red-600">
                Failed to load inventory.
            </div>
        );

    }

    const products =
        data?.inventory.content ?? [];

    const summary =
        data?.summary ?? {

            totalProducts: 0,

            availableUnits: 0,

            reservedUnits: 0,

            outOfStockProducts: 0,

        };

    return (

        <div className="space-y-8">

            <div>

                <h1 className="font-[var(--font-playfair)] text-5xl">
                    Inventory
                </h1>

                <p className="mt-3 text-neutral-500">
                    Monitor stock levels and adjust inventory.
                </p>

            </div>

            <InventorySummaryCards
                summary={
                    summary
                }
            />

            <InventoryToolbar

                search={
                    search
                }

                onSearchChange={
                    setSearch
                }

                filter={
                    filter
                }

                onFilterChange={
                    setFilter
                }

            />

            <InventoryTable

                inventory={
                    products
                }

                onRestock={
                    handleRestock
                }

            />

            <RestockInventoryDialog

                open={
                    dialogOpen
                }

                onOpenChange={
                    setDialogOpen
                }

                inventory={
                    selectedInventory
                }

            />

        </div>

    );

}