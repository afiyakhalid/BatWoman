import api from "@/lib/axios";

export interface Inventory {

    inventoryId: string;

    productId: string;

    productName: string;

    availableQuantity: number;

    reservedQuantity: number;

    totalQuantity: number;

    updatedAt: string;

}

export interface RestockInventoryRequest {

    productId: string;

    quantity: number;

}

export async function getInventory(): Promise<Inventory[]> {

    const { data } = await api.get(
        "/admin/inventory"
    );

    return data;

}

export async function getInventoryByProduct(
    productId: string
): Promise<Inventory> {

    const { data } = await api.get(
        `/admin/inventory/${productId}`
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