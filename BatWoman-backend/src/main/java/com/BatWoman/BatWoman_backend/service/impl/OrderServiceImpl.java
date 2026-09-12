package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.address.AddressResponse;
import com.BatWoman.BatWoman_backend.dto.order.CheckoutRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderDetailsResponse;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;
import com.BatWoman.BatWoman_backend.entity.Address;
import com.BatWoman.BatWoman_backend.entity.Cart;
import com.BatWoman.BatWoman_backend.entity.CartItem;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.OrderItem;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductVariant;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import com.BatWoman.BatWoman_backend.enums.PaymentStatus;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
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

    private static final BigDecimal FREE_SHIPPING_THRESHOLD =
            BigDecimal.valueOf(1000);

    private static final BigDecimal STANDARD_SHIPPING_FEE =
            BigDecimal.valueOf(80);

    // =========================================================================
    // PUBLIC API METHODS
    // =========================================================================

    @Override
    public OrderResponse checkout(CheckoutRequest request) {

        User user =
                authService.getCurrentUser();

        Cart cart =
                cartService.getCurrentCart();

        // 1. Validation

        if (cart.getCartItems() == null
                || cart.getCartItems().isEmpty()) {

            throw new ValidationException(
                    "Cannot process checkout: Cart is empty."
            );
        }

        if (request.addressId() == null) {

            throw new ValidationException(
                    "Shipping address is required."
            );
        }

        Address address =
                addressRepository
                        .findById(request.addressId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found."
                                )
                        );

        if (!address.getUser()
                .getId()
                .equals(user.getId())) {

            throw new ValidationException(
                    "Selected address does not belong to the current user."
            );
        }

        // 2. Financial Calculations

        BigDecimal subtotal =
                calculateSubtotal(
                        cart.getCartItems()
                );

        BigDecimal shipping =
                calculateShipping(subtotal);

        BigDecimal discount =
                calculateDiscount();

        BigDecimal total =
                subtotal
                        .add(shipping)
                        .subtract(discount)
                        .setScale(
                                2,
                                RoundingMode.HALF_UP
                        );

        // 3. Build Pending Order Header

        Order order =
                Order.builder()
                        .id(UUID.randomUUID())
                        .user(user)
                        .address(address)
                        .orderNumber(
                                generateOrderNumber()
                        )
                        .status(
                                OrderStatus.PENDING
                        )
                        .subtotal(subtotal)
                        .shippingCharge(shipping)
                        .discount(discount)
                        .total(total)
                        .createdAt(
                                OffsetDateTime.now()
                        )
                        .updatedAt(
                                OffsetDateTime.now()
                        )
                        .build();

        // 4. Reserve Variant Inventory & Construct Line Items

        List<OrderItem> orderItems =
                new ArrayList<>();

        for (CartItem cartItem :
                cart.getCartItems()) {

            /*
             * CartItem contains the ProductVariant.
             *
             * CartItem
             *     ↓
             * ProductVariant
             *     ↓
             * Product
             */
            ProductVariant variant =
                    cartItem.getVariant();

            if (variant == null) {

                throw new ValidationException(
                        "Cart item is missing its product variant."
                );
            }

            Product product =
                    variant.getProduct();

            if (product == null) {

                throw new ValidationException(
                        "Selected product variant is not associated with a product."
                );
            }

            if (!Boolean.TRUE.equals(
                    variant.getActive())) {

                throw new ValidationException(
                        "Selected product variant is no longer available."
                );
            }

            /*
             * Reserve inventory for the exact variant.
             */
            inventoryService.reserveInventory(
                    variant.getId(),
                    cartItem.getQuantity()
            );

            BigDecimal lineSubtotal =
                    product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            cartItem.getQuantity()
                                    )
                            )
                            .setScale(
                                    2,
                                    RoundingMode.HALF_UP
                            );

            OrderItem orderItem =
                    OrderItem.builder()
                            .id(UUID.randomUUID())
                            .order(order)

                            /*
                             * Product identity.
                             */
                            .product(product)

                            /*
                             * Exact purchased variant.
                             */
                            .variant(variant)

                            /*
                             * Historical variant snapshots.
                             */
                            .variantSku(
                                    variant.getSku()
                            )
                            .size(
                                    variant.getSize()
                                            .getLabel()
                            )
                            .color(
                                    variant.getColor()
                                            .getName()
                            )

                            .quantity(
                                    cartItem.getQuantity()
                            )
                            .unitPrice(
                                    product.getPrice()
                            )
                            .subtotal(lineSubtotal)
                            .createdAt(
                                    OffsetDateTime.now()
                            )
                            .build();

            orderItems.add(orderItem);
        }

        order.setOrderItems(orderItems);

        // 5. Persist Order Aggregate

        Order savedOrder =
                orderRepository.save(order);

        // 6. Clear Active Cart

        cartService.clearCart();

        log.info(
                "Order {} created with PENDING status for user {}",
                savedOrder.getOrderNumber(),
                user.getId()
        );

        return toResponse(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDetailsResponse getOrderById(
            UUID orderId) {

        Order order =
                orderRepository
                        .findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found with ID: "
                                                + orderId
                                )
                        );

        User currentUser =
                authService.getCurrentUser();

        if (order.getUser() != null
                && !order.getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new ValidationException(
                    "You are not authorized to view this order."
            );
        }

        return toDetailsResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders() {

        User user =
                authService.getCurrentUser();

        return orderRepository
                .findByUser_Id(
                        user.getId(),
                        Pageable.unpaged()
                )
                .getContent()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public void cancelOrder(
            UUID orderId) {

        Order order =
                orderRepository
                        .findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found with ID: "
                                                + orderId
                                )
                        );

        User currentUser =
                authService.getCurrentUser();

        if (order.getUser() != null
                && !order.getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new ValidationException(
                    "You cannot cancel another user's order."
            );
        }

        if (order.getStatus()
                != OrderStatus.PENDING) {

            throw new ValidationException(
                    "Only PENDING orders can be cancelled."
            );
        }

        /*
         * Release inventory for the exact variant
         * that was reserved during checkout.
         */
        for (OrderItem item :
                order.getOrderItems()) {

            if (item.getVariant() == null) {

                throw new ValidationException(
                        "Order item is missing its product variant."
                );
            }

            inventoryService.releaseInventory(
                    item.getVariant().getId(),
                    item.getQuantity()
            );
        }

        order.setStatus(
                OrderStatus.CANCELLED
        );

        order.setUpdatedAt(
                OffsetDateTime.now()
        );

        orderRepository.save(order);

        log.info(
                "Order {} cancelled. Inventory released.",
                order.getOrderNumber()
        );
    }

    // =========================================================================
    // PAYMENT LIFECYCLE CALLBACKS
    // =========================================================================

    public void handlePaymentSuccess(
            UUID orderId) {

        Order order =
                orderRepository
                        .findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found."
                                )
                        );

        if (order.getStatus()
                != OrderStatus.PENDING) {

            log.warn(
                    "Order {} is already processed. Current status: {}",
                    orderId,
                    order.getStatus()
            );

            return;
        }

        order.setStatus(
                OrderStatus.CONFIRMED
        );

        order.setUpdatedAt(
                OffsetDateTime.now()
        );

        orderRepository.save(order);

        /*
         * Permanently reduce the reserved inventory
         * for each exact product variant.
         */
        for (OrderItem item :
                order.getOrderItems()) {

            if (item.getVariant() == null) {

                throw new ValidationException(
                        "Order item is missing its product variant."
                );
            }

            inventoryService.reduceInventory(
                    item.getVariant().getId(),
                    item.getQuantity()
            );
        }

        log.info(
                "Payment SUCCESS for order {}. Inventory reduced.",
                order.getOrderNumber()
        );
    }

    public void handlePaymentFailure(
            UUID orderId) {

        Order order =
                orderRepository
                        .findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found."
                                )
                        );

        if (order.getStatus()
                != OrderStatus.PENDING) {

            return;
        }

        order.setStatus(
                OrderStatus.FAILED
        );

        order.setUpdatedAt(
                OffsetDateTime.now()
        );

        orderRepository.save(order);

        /*
         * Release the reserved inventory for each
         * exact product variant.
         */
        for (OrderItem item :
                order.getOrderItems()) {

            if (item.getVariant() == null) {

                throw new ValidationException(
                        "Order item is missing its product variant."
                );
            }

            inventoryService.releaseInventory(
                    item.getVariant().getId(),
                    item.getQuantity()
            );
        }

        log.info(
                "Payment FAILED for order {}. Inventory released.",
                order.getOrderNumber()
        );
    }

    // =========================================================================
    // HELPER METHODS
    // =========================================================================

    private String generateOrderNumber() {

        return "BW-" + System.currentTimeMillis();
    }

    private BigDecimal calculateSubtotal(
            List<CartItem> cartItems) {

        return cartItems
                .stream()
                .map(cartItem -> {

                    ProductVariant variant =
                            cartItem.getVariant();

                    if (variant == null) {

                        throw new ValidationException(
                                "Cart item is missing its product variant."
                        );
                    }

                    Product product =
                            variant.getProduct();

                    if (product == null) {

                        throw new ValidationException(
                                "Selected product variant is not associated with a product."
                        );
                    }

                    return product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            cartItem.getQuantity()
                                    )
                            );
                })
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add
                )
                .setScale(
                        2,
                        RoundingMode.HALF_UP
                );
    }

    private BigDecimal calculateShipping(
            BigDecimal subtotal) {

        if (subtotal.compareTo(
                FREE_SHIPPING_THRESHOLD
        ) >= 0) {

            return BigDecimal.ZERO
                    .setScale(
                            2,
                            RoundingMode.HALF_UP
                    );
        }

        return STANDARD_SHIPPING_FEE
                .setScale(
                        2,
                        RoundingMode.HALF_UP
                );
    }

    private BigDecimal calculateDiscount() {

        return BigDecimal.ZERO
                .setScale(
                        2,
                        RoundingMode.HALF_UP
                );
    }

    // =========================================================================
    // RESPONSE MAPPING
    // =========================================================================

    private OrderResponse toResponse(
            Order order) {

        List<OrderResponse.OrderItemResponse> items =
                order.getOrderItems()
                        .stream()
                        .map(item ->
                                new OrderResponse.OrderItemResponse(

                                        item.getProduct().getId(),

                                        item.getProduct().getName(),

                                        item.getVariant() != null
                                                ? item.getVariant().getId()
                                                : null,

                                        item.getVariantSku(),

                                        item.getSize(),

                                        item.getColor(),

                                        item.getQuantity(),

                                        item.getUnitPrice(),

                                        item.getSubtotal()
                                )
                        )
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

    private OrderDetailsResponse toDetailsResponse(
            Order order) {

        List<OrderResponse.OrderItemResponse> items =
                order.getOrderItems()
                        .stream()
                        .map(item ->
                                new OrderResponse.OrderItemResponse(

                                        item.getProduct().getId(),

                                        item.getProduct().getName(),

                                        item.getVariant() != null
                                                ? item.getVariant().getId()
                                                : null,

                                        item.getVariantSku(),

                                        item.getSize(),

                                        item.getColor(),

                                        item.getQuantity(),

                                        item.getUnitPrice(),

                                        item.getSubtotal()
                                )
                        )
                        .toList();

        Address address =
                order.getAddress();

        AddressResponse addressResponse =
                null;

        if (address != null) {

            addressResponse =
                    new AddressResponse(

                            address.getId(),

                            address.getFullName(),

                            address.getPhone(),

                            address.getAddressLine1(),

                            address.getAddressLine2(),

                            address.getCity(),

                            address.getState(),

                            address.getCountry(),

                            address.getPostalCode(),

                            address.getDefaultAddress()
                    );
        }

        PaymentStatus paymentStatus =
                null;

        if (order.getPayment() != null) {

            paymentStatus =
                    order.getPayment()
                            .getPaymentStatus();
        }

        return new OrderDetailsResponse(

                order.getId(),

                order.getOrderNumber(),

                order.getStatus(),

                paymentStatus,

                order.getSubtotal(),

                order.getShippingCharge(),

                order.getDiscount(),

                order.getTotal(),

                order.getCreatedAt(),

                addressResponse,

                items
        );
    }
}