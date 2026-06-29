package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.admin.RestockInventoryRequest;
import com.BatWoman.BatWoman_backend.dto.admin.UpdateOrderStatusRequest;


import java.util.UUID;

public interface AdminService {

    /**
     * Dashboard statistics.
     */


    /**
     * Update order status.
     */
    void updateOrderStatus(
            UUID orderId,
            UpdateOrderStatusRequest request
    );

    /**
     * Increase or decrease inventory.
     */
    void updateInventory(
            UUID productId,
            RestockInventoryRequest request
    );

}