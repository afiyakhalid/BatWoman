package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.order.CheckoutRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;

import java.util.List;
import java.util.UUID;

public interface OrderService {

    /**
     * Checkout cart and create order.
     */
    OrderResponse checkout(CheckoutRequest request);

    /**
     * Returns order details.
     */
    OrderResponse getOrderById(UUID orderId);

    /**
     * Returns logged-in user's orders.
     */
    List<OrderResponse> getMyOrders();

    /**
     * Cancel order.
     */
    void cancelOrder(UUID orderId);

}
