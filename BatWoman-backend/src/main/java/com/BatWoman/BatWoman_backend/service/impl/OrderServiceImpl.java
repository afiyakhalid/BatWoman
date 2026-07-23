package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.order.CheckoutRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;
import com.BatWoman.BatWoman_backend.entity.*;
import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.AddressRepository;
import com.BatWoman.BatWoman_backend.repository.OrderItemRepository;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.service.AuthService;
import com.BatWoman.BatWoman_backend.service.CartService;
import com.BatWoman.BatWoman_backend.service.InventoryService;
import com.BatWoman.BatWoman_backend.service.NotificationService;
import com.BatWoman.BatWoman_backend.service.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressRepository addressRepository;
    private final CartService cartService;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;
    private final AuthService authService;

    private String generateOrderNumber() {
        return "BW-" + System.currentTimeMillis();
    }

    private BigDecimal calculateShipping(BigDecimal subtotal) {

        if (subtotal.compareTo(BigDecimal.valueOf(1000)) >= 0) {
            return BigDecimal.ZERO;
        }

        return BigDecimal.valueOf(80);
    }

    private BigDecimal calculateDiscount() {
        return BigDecimal.ZERO;
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

    @Override
    public OrderResponse checkout(CheckoutRequest request) {

        User user = authService.getCurrentUser();

        Cart cart = cartService.getCurrentCart();

        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            throw new ValidationException("Cart is empty.");
        }

        if (request.addressId() == null) {
            throw new ValidationException("Shipping address is required.");
        }

        Address address = addressRepository.findById(request.addressId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found."));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new ValidationException(
                    "This address does not belong to the current user.");
        }

        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem item : cart.getCartItems()) {

            subtotal = subtotal.add(
                    item.getProduct()
                            .getPrice()
                            .multiply(BigDecimal.valueOf(item.getQuantity()))
            );
        }

        BigDecimal shipping = calculateShipping(subtotal);

        BigDecimal discount = calculateDiscount();

        BigDecimal total = subtotal
                .add(shipping)
                .subtract(discount);

        Order order = Order.builder()
                .id(UUID.randomUUID())
                .user(user)
                .address(address)
                .orderNumber(generateOrderNumber())
                .status(OrderStatus.PENDING)
                .subtotal(subtotal)
                .shippingCharge(shipping)
                .discount(discount)
                .total(total)
                .createdAt(OffsetDateTime.now())
                .updatedAt(OffsetDateTime.now())
                .build();

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getCartItems()) {

            Product product = cartItem.getProduct();

            // Reserve inventory for each item before generating the OrderItem
            inventoryService.reserveInventory(
                    product.getId(),
                    cartItem.getQuantity()
            );

            OrderItem orderItem = OrderItem.builder()
                    .id(UUID.randomUUID())
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .unitPrice(product.getPrice())
                    .subtotal(
                            product.getPrice().multiply(
                                    BigDecimal.valueOf(cartItem.getQuantity())
                            )
                    )
                    .createdAt(OffsetDateTime.now())
                    .build();

            orderItems.add(orderItem);
        }

        order.setOrderItems(orderItems);
        order = orderRepository.save(order);

        return toResponse(order);
    }

    @Override
    public OrderResponse getOrderById(UUID orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found."));

        User currentUser = authService.getCurrentUser();

        if (order.getUser() != null &&
                !order.getUser().getId().equals(currentUser.getId())) {

            throw new ValidationException(
                    "You are not allowed to view this order.");
        }

        return toResponse(order);
    }

    @Override
    public List<OrderResponse> getMyOrders() {

        User user = authService.getCurrentUser();

        return orderRepository
                .findByUser_Id(user.getId(), Pageable.unpaged())
                .getContent()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public void cancelOrder(UUID orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found."));

        User currentUser = authService.getCurrentUser();

        if (order.getUser() != null &&
                !order.getUser().getId().equals(currentUser.getId())) {

            throw new ValidationException(
                    "You cannot cancel another user's order.");
        }

        if (order.getStatus() != OrderStatus.PENDING) {

            throw new ValidationException(
                    "Only pending orders can be cancelled.");
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setUpdatedAt(OffsetDateTime.now());

        orderRepository.save(order);

        for (OrderItem item : order.getOrderItems()) {

            inventoryService.releaseInventory(
                    item.getProduct().getId(),
                    item.getQuantity()
            );
        }
    }
}