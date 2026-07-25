package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.admin.RestockInventoryRequest;
import com.BatWoman.BatWoman_backend.dto.admin.UpdateOrderStatusRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;

import java.util.List;
import java.util.UUID;

public interface AdminService {

    void restockInventory(RestockInventoryRequest request);

    void updateOrderStatus(
            UUID orderId,
            UpdateOrderStatusRequest request
    );
    List<OrderResponse> getAllOrders();

    OrderResponse getOrderById(UUID orderId);
}