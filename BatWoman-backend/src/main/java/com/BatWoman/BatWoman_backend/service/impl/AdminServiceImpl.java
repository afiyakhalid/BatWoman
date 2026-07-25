package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.admin.RestockInventoryRequest;
import com.BatWoman.BatWoman_backend.dto.admin.UpdateOrderStatusRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;
import com.BatWoman.BatWoman_backend.entity.Inventory;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.repository.InventoryRepository;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.service.AdminService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final InventoryRepository inventoryRepository;
    private final OrderRepository orderRepository;

    @Override
    public void restockInventory(RestockInventoryRequest request) {

        Inventory inventory = inventoryRepository
                .findByProduct_Id(request.productId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found for product: "
                                        + request.productId()));

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity() + request.quantity()
        );

        inventoryRepository.save(inventory);
    }

    @Override
    public void updateOrderStatus(UUID orderId, UpdateOrderStatusRequest request) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with ID: " + orderId));

        order.setStatus(request.status());

        orderRepository.save(order);
    }

    @Override
    public List<OrderResponse> getAllOrders() {

        return orderRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrderById(UUID orderId) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with ID: " + orderId
                        ));

        return toResponse(order);
    }

    private OrderResponse toResponse(Order order) {

        List<OrderResponse.OrderItemResponse> items =
                order.getOrderItems()
                        .stream()
                        .map(item -> new OrderResponse.OrderItemResponse(
                                item.getProduct().getId(),
                                item.getProduct().getName(),
                                item.getQuantity(),
                                item.getUnitPrice(),
                                item.getSubtotal()
                        ))
                        .collect(Collectors.toList());

        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getStatus(),
                order.getSubtotal(),
                order.getShippingCharge(),
                order.getTotal(),
                order.getCreatedAt(),
                items
        );
    }
}