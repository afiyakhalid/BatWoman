package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.order.CheckoutRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderDetailsResponse;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;

import java.util.List;
import java.util.UUID;

public interface OrderService {

    OrderResponse checkout(CheckoutRequest request);

    OrderDetailsResponse getOrderById(UUID orderId);

    List<OrderResponse> getMyOrders();

    void cancelOrder(UUID orderId);

}