package com.BatWoman.BatWoman_backend.service;

import java.util.UUID;

public interface InventoryService {

    void reserveInventory(
            UUID variantId,
            Integer quantity
    );

    void releaseInventory(
            UUID variantId,
            Integer quantity
    );

    void reduceInventory(
            UUID variantId,
            Integer quantity
    );

    void increaseInventory(
            UUID variantId,
            Integer quantity
    );
}