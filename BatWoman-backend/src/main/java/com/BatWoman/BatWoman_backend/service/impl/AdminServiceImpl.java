package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.admin.RestockInventoryRequest;
import com.BatWoman.BatWoman_backend.dto.admin.UpdateOrderStatusRequest;
import com.BatWoman.BatWoman_backend.entity.Inventory;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.repository.InventoryRepository;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.service.AdminService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public void updateOrderStatus(
            java.util.UUID orderId,
            UpdateOrderStatusRequest request) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with ID: " + orderId));

        order.setStatus(request.status());

        orderRepository.save(order);
    }
}