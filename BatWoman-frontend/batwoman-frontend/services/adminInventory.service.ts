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

export interface AdminInventoryVariantResponse {

    inventoryId: string;

    variantId: string;

    sku: string;

    size: string;

    color: string;

    availableQuantity: number;

    reservedQuantity: number;

    totalQuantity: number;

    updatedAt: string;

}

export interface AdminInventoryProductResponse {

    productId: string;

    productName: string;

    variantCount: number;

    availableQuantity: number;

    reservedQuantity: number;

    totalQuantity: number;

    status: string;

    updatedAt: string;

    variants: AdminInventoryVariantResponse[];

}

export interface PageResponse<T> {

    content: T[];

    page: number;

    size: number;

    totalElements: number;

    totalPages: number;

    first: boolean;

    last: boolean;

}

export interface AdminInventorySummaryResponse {

    totalProducts: number;

    availableUnits: number;

    reservedUnits: number;

    outOfStockProducts: number;

}

export interface AdminInventoryPageResponse {

    inventory: PageResponse<AdminInventoryProductResponse>;

    summary: AdminInventorySummaryResponse;

}

export interface RestockInventoryRequest {

    variantId: string;

    quantity: number;

}

export type InventoryAdjustmentType =
    | "INCREASE"
    | "DECREASE";

export interface AdjustInventoryRequest {

    variantId: string;

    quantity: number;

    adjustmentType: InventoryAdjustmentType;

}

export interface GetInventoryParams {

    search?: string;

    filter?: string;

    page?: number;

    size?: number;

}

export async function getInventory(
    params: GetInventoryParams = {}
): Promise<AdminInventoryPageResponse> {

    const {
        search = "",
        filter = "ALL",
        page = 0,
        size = 100,
    } = params;

    const { data } =
        await api.get<AdminInventoryPageResponse>(
            "/admin/inventory",
            {
                params: {
                    search,
                    filter,
                    page,
                    size,
                },
            }
        );

    return data;

}

export async function getInventoryByVariant(
    variantId: string
): Promise<Inventory> {

    const { data } =
        await api.get<Inventory>(
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

export async function adjustInventory(
    request: AdjustInventoryRequest
): Promise<void> {

    await api.post(
        "/admin/inventory/adjust",
        request
    );

}