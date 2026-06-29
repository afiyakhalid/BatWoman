package com.BatWoman.BatWoman_backend.service;

import java.util.UUID;

public interface InventoryService {

    void reserveInventory(
            UUID productId,
            Integer quantity
    );

    void releaseInventory(
            UUID productId,
            Integer quantity
    );

    void reduceInventory(
            UUID productId,
            Integer quantity
    );

    void increaseInventory(
            UUID productId,
            Integer quantity
    );

}
