import api from "@/lib/axios";

export interface Inventory {

    inventoryId: string;

    variantId: string;

    productId: string;

    productName: string;

    sku: string;

    size: string;

    color: string;

    availableQuantity: number;

    reservedQuantity: number;

    totalQuantity: number;

    updatedAt: string;

}

export interface RestockInventoryRequest {

    variantId: string;

    quantity: number;

}

export async function getInventory(): Promise<Inventory[]> {

    const { data } = await api.get<Inventory[]>(
        "/admin/inventory"
    );

    return data;

}

export async function getInventoryByVariant(
    variantId: string
): Promise<Inventory> {

    const { data } = await api.get<Inventory>(
        `/admin/inventory/${variantId}`
    );

    return data;

}

export async function restockInventory(
    request: RestockInventoryRequest
): Promise<void> {

    await api.post(
        "/admin/inventory/restock",
        request
    );

}