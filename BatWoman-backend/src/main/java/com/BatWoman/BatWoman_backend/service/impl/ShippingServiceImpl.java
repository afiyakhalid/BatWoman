package com.BatWoman.BatWoman_backend.service.impl;
import org.springframework.transaction.annotation.Propagation;
import com.BatWoman.BatWoman_backend.dto.shipping.CreateShipmentRequest;
import com.BatWoman.BatWoman_backend.dto.shipping.ShipmentResponse;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Shipment;
import com.BatWoman.BatWoman_backend.enums.ShipmentStatus;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.repository.ShipmentRepository;
import com.BatWoman.BatWoman_backend.service.ShippingService;
import com.BatWoman.BatWoman_backend.service.shipping.ShippingProviderClient;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;
import com.BatWoman.BatWoman_backend.config.ShiprocketConfig;
import com.BatWoman.BatWoman_backend.dto.shipping.ShippingRateRequest;
import com.BatWoman.BatWoman_backend.dto.shipping.ShippingRateResponse;
import com.BatWoman.BatWoman_backend.entity.Address;
import com.BatWoman.BatWoman_backend.entity.Cart;
import com.BatWoman.BatWoman_backend.entity.CartItem;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductVariant;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.repository.AddressRepository;
import com.BatWoman.BatWoman_backend.service.AuthService;
import com.BatWoman.BatWoman_backend.service.CartService;

import java.math.BigDecimal;
import java.util.List;

import java.util.UUID;
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ShippingServiceImpl implements ShippingService {

    private final ShipmentRepository shipmentRepository;

    private final OrderRepository orderRepository;

    private final ShippingProviderClient shippingProviderClient;
    private final AddressRepository addressRepository;
    private final AuthService authService;
    private final CartService cartService;
    private final ShiprocketConfig shiprocketConfig;

    private static final BigDecimal DEFAULT_PACKAGE_WEIGHT =
            new BigDecimal("0.5");

//    @Override
//    public ShipmentResponse createShipment(
//            CreateShipmentRequest request
//    ) {
//
//        Order order = orderRepository.findById(request.orderId())
//                .orElseThrow(() ->
//                        new EntityNotFoundException(
//                                "Order not found."
//                        )
//                );
//
//        if (shipmentRepository.existsByOrder_Id(order.getId())) {
//            throw new IllegalStateException(
//                    "A shipment already exists for this order."
//            );
//        }
//
//        Shipment shipment = Shipment.builder()
//                .order(order)
//                .status(ShipmentStatus.PENDING)
//                .build();
//
//        shipment = shipmentRepository.save(shipment);
//
//        /*
//         * Phase 1:
//         * Persist the shipment locally.
//         *
//         * Phase 2:
//         * This will call Shiprocket and populate:
//         * carrier
//         * trackingNumber
//         * trackingUrl
//         * expectedDelivery
//         */
//        shippingProviderClient.createShipment(
//                order,
//                shipment
//        );
//
//        return toResponse(shipment);
//    }
@Override
@Transactional(readOnly = true)
public ShippingRateResponse getShippingRates(
        UUID addressId,
        boolean cod
) {

    // =========================================================
    // 1. GET AUTHENTICATED CUSTOMER
    // =========================================================

    User currentUser = authService.getCurrentUser();

    // =========================================================
    // 2. GET CUSTOMER'S SELECTED ADDRESS
    // =========================================================

    Address address = addressRepository
            .findByIdAndUser(addressId, currentUser)
            .orElseThrow(() ->
                    new EntityNotFoundException(
                            "Delivery address not found."
                    )
            );

    String deliveryPostcode = address.getPostalCode();

    if (deliveryPostcode == null || deliveryPostcode.isBlank()) {
        throw new IllegalStateException(
                "Delivery address does not contain a valid pincode."
        );
    }

    // =========================================================
    // 3. GET PICKUP PINCODE FROM CONFIGURATION
    // =========================================================

    String pickupPostcode = shiprocketConfig.getPickupPostcode();

    if (pickupPostcode == null || pickupPostcode.isBlank()) {
        throw new IllegalStateException(
                "Shiprocket pickup pincode has not been configured."
        );
    }

    // =========================================================
    // 4. GET CUSTOMER CART
    // =========================================================

    Cart cart = cartService.getCurrentCart();

    List<CartItem> cartItems = cart.getCartItems();

    if (cartItems == null || cartItems.isEmpty()) {
        throw new IllegalStateException(
                "Cannot calculate shipping for an empty cart."
        );
    }

    // =========================================================
    // 5. CALCULATE DECLARED SHIPMENT VALUE
    // =========================================================

    BigDecimal declaredValue = BigDecimal.ZERO;

    for (CartItem cartItem : cartItems) {

        ProductVariant variant = cartItem.getVariant();

        if (variant == null || variant.getProduct() == null) {
            throw new IllegalStateException(
                    "Cart contains an invalid product variant."
            );
        }

        Product product = variant.getProduct();

        BigDecimal sellingPrice =
                product.getDiscountPrice() != null
                        ? product.getDiscountPrice()
                        : product.getPrice();

        if (sellingPrice == null || sellingPrice.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalStateException(
                    "Invalid product price found in cart."
            );
        }

        BigDecimal itemValue = sellingPrice.multiply(
                BigDecimal.valueOf(cartItem.getQuantity())
        );

        declaredValue = declaredValue.add(itemValue);
    }

    // =========================================================
    // 6. BUILD SHIPROCKET RATE REQUEST
    // =========================================================

    ShippingRateRequest request = new ShippingRateRequest(
            pickupPostcode,
            deliveryPostcode,
            DEFAULT_PACKAGE_WEIGHT,
            cod,
            declaredValue
    );

    // =========================================================
    // 7. FETCH AVAILABLE COURIERS FROM SHIPROCKET
    // =========================================================

    return shippingProviderClient.getShippingRates(request);
}
@Override
@Transactional(propagation = Propagation.REQUIRES_NEW)
public ShipmentResponse createShipment(
        CreateShipmentRequest request
) {

    Order order = orderRepository.findById(request.orderId())
            .orElseThrow(() ->
                    new EntityNotFoundException(
                            "Order not found."
                    )
            );

    if (shipmentRepository.existsByOrder_Id(order.getId())) {
        throw new IllegalStateException(
                "A shipment already exists for this order."
        );
    }

    // =========================================================
    // 1. CREATE AND SAVE LOCAL SHIPMENT
    // =========================================================

    Shipment shipment = Shipment.builder()
            .order(order)
            .status(ShipmentStatus.PROCESSING)
            .build();

    shipment = shipmentRepository.saveAndFlush(shipment);

    log.info(
            "Local shipment created: shipmentId={}, orderId={}, status={}",
            shipment.getId(),
            order.getId(),
            shipment.getStatus()
    );

    // =========================================================
    // 2. CREATE SHIPMENT IN SHIPROCKET
    // =========================================================

    try {

        shippingProviderClient.createShipment(
                order,
                shipment
        );

    } catch (Exception ex) {

        log.error(
                "Shiprocket shipment creation failed for order {}. " +
                        "Local shipment remains PROCESSING.",
                order.getOrderNumber(),
                ex
        );
    }

    return toResponse(shipment);
}
    @Override
    @Transactional(readOnly = true)
    public ShipmentResponse getShipmentById(
            UUID shipmentId
    ) {

        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found."
                        )
                );

        return toResponse(shipment);
    }

    @Override
    @Transactional(readOnly = true)
    public ShipmentResponse getShipmentByOrderId(
            UUID orderId
    ) {

        Shipment shipment = shipmentRepository
                .findByOrder_Id(orderId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found for this order."
                        )
                );

        return toResponse(shipment);
    }

    @Override
    public ShipmentResponse updateShipmentStatus(
            UUID shipmentId,
            String status
    ) {

        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Shipment not found."
                        )
                );

        ShipmentStatus shipmentStatus;

        try {
            shipmentStatus =
                    ShipmentStatus.valueOf(
                            status.trim().toUpperCase()
                    );
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException(
                    "Invalid shipment status: " + status
            );
        }

        shipment.setStatus(shipmentStatus);

        shipment = shipmentRepository.save(shipment);

        return toResponse(shipment);
    }

    private ShipmentResponse toResponse(
            Shipment shipment
    ) {

        Order order = shipment.getOrder();

        return new ShipmentResponse(
                shipment.getId(),
                order.getId(),
                order.getOrderNumber(),
                shipment.getStatus(),
                shipment.getCarrier(),
                shipment.getTrackingNumber(),
                shipment.getTrackingUrl(),
                shipment.getExpectedDelivery(),
                shipment.getShippedAt(),
                shipment.getDeliveredAt(),
                shipment.getCreatedAt(),
                shipment.getUpdatedAt()
        );
    }
}