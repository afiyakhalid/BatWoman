package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.admin.*;
import java.time.OffsetDateTime;
import com.BatWoman.BatWoman_backend.dto.common.PageResponse;
import com.BatWoman.BatWoman_backend.dto.admin.settings.AdminProfileResponse;
import com.BatWoman.BatWoman_backend.dto.admin.settings.ChangeEmailRequest;
import com.BatWoman.BatWoman_backend.dto.admin.settings.ChangePasswordRequest;
import com.BatWoman.BatWoman_backend.dto.admin.settings.UpdateAdminProfileRequest;
import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;
import com.BatWoman.BatWoman_backend.dto.payment.PaymentResponse;
import com.BatWoman.BatWoman_backend.entity.Inventory;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Payment;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import com.BatWoman.BatWoman_backend.enums.PaymentStatus;
import com.BatWoman.BatWoman_backend.enums.Role;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.InventoryRepository;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.repository.PaymentRepository;
import com.BatWoman.BatWoman_backend.repository.ProductRepository;
import com.BatWoman.BatWoman_backend.repository.UserRepository;
import com.BatWoman.BatWoman_backend.service.AdminService;
import com.BatWoman.BatWoman_backend.dto.admin.AdjustInventoryRequest;
import com.BatWoman.BatWoman_backend.enums.InventoryAdjustmentType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {
    private static final int LOW_STOCK_THRESHOLD = 10;

    private final InventoryRepository inventoryRepository;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void restockInventory(
            RestockInventoryRequest request) {

        Inventory inventory =
                inventoryRepository
                        .findByVariant_Id(
                                request.variantId()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inventory not found for variant: "
                                                + request.variantId()
                                )
                        );

        inventory.setAvailableQuantity(
                inventory.getAvailableQuantity()
                        + request.quantity()
        );

        inventoryRepository.save(inventory);
    }

    @Override
    public void adjustInventory(
            AdjustInventoryRequest request) {

        Inventory inventory =
                inventoryRepository
                        .findByVariant_Id(
                                request.variantId()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inventory not found for variant: "
                                                + request.variantId()
                                )
                        );

        int quantity = request.quantity();

        if (request.adjustmentType()
                == InventoryAdjustmentType.INCREASE) {

            inventory.setAvailableQuantity(
                    inventory.getAvailableQuantity()
                            + quantity
            );

        } else if (request.adjustmentType()
                == InventoryAdjustmentType.DECREASE) {

            if (inventory.getAvailableQuantity()
                    < quantity) {

                throw new ValidationException(
                        "Cannot decrease inventory by "
                                + quantity
                                + ". Only "
                                + inventory.getAvailableQuantity()
                                + " units are currently available."
                );
            }

            inventory.setAvailableQuantity(
                    inventory.getAvailableQuantity()
                            - quantity
            );
        }

        inventory.setUpdatedAt(
                OffsetDateTime.now()
        );

        inventoryRepository.save(
                inventory
        );
    }

    @Override
    public void updateOrderStatus(
            UUID orderId,
            UpdateOrderStatusRequest request) {

        Order order =
                orderRepository
                        .findById(orderId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Order not found with ID: "
                                                + orderId
                                )
                        );

        order.setStatus(
                request.status()
        );

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
    public OrderResponse getOrderById(
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

        return toResponse(order);
    }

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
                        .toList();

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
    public List<PaymentResponse> getAllPayments() {

        return paymentRepository
                .findAll()
                .stream()
                .map(this::toPaymentResponse)
                .toList();
    }

    @Override
    public PaymentResponse getPaymentById(
            UUID paymentId) {

        Payment payment =
                paymentRepository
                        .findById(paymentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found."
                                )
                        );

        return toPaymentResponse(payment);
    }

    private PaymentResponse toPaymentResponse(
            Payment payment) {

        return new PaymentResponse(

                payment.getId(),

                payment.getOrder().getId(),

                payment.getRazorpayOrderId(),

                payment.getRazorpayPaymentId(),

                payment.getAmount(),

                payment.getCurrency(),

                payment.getPaymentStatus(),

                payment.getPaidAt()
        );
    }

    private InventoryResponse toInventoryResponse(
            Inventory inventory) {

        return new InventoryResponse(

                inventory.getId(),

                inventory.getVariant().getId(),

                inventory.getVariant()
                        .getProduct()
                        .getId(),

                inventory.getVariant()
                        .getProduct()
                        .getName(),

                inventory.getVariant()
                        .getSku(),

                inventory.getVariant()
                        .getSize()
                        .getLabel(),

                inventory.getVariant()
                        .getColor()
                        .getName(),

                inventory.getAvailableQuantity(),

                inventory.getReservedQuantity(),

                inventory.getAvailableQuantity()
                        + inventory.getReservedQuantity(),

                inventory.getUpdatedAt()
        );
    }

    @Override
    public AdminInventoryPageResponse getAllInventory(
            String search,
            String filter,
            int page,
            int size) {

        int resolvedPage = Math.max(page, 0);
        int resolvedSize = Math.min(
                Math.max(size, 1),
                100
        );

        String normalizedSearch =
                search == null ? "" : search.trim();

        String normalizedFilter = normalizeInventoryFilter(filter);

        Pageable pageable = PageRequest.of(
                resolvedPage,
                resolvedSize
        );

        Page<UUID> productIdsPage =
                inventoryRepository.findProductIdsForAdminInventory(
                        normalizedSearch,
                        normalizedFilter,
                        LOW_STOCK_THRESHOLD,
                        pageable
                );

        List<AdminInventoryProductResponse> content = new ArrayList<>();

        if (!productIdsPage.isEmpty()) {
            List<UUID> productIds = productIdsPage.getContent();

            List<Inventory> inventories =
                    inventoryRepository.findByProductIdsWithVariantDetails(
                            productIds
                    );

            Map<UUID, List<Inventory>> byProduct =
                    new LinkedHashMap<>();

            for (UUID productId : productIds) {
                byProduct.put(productId, new ArrayList<>());
            }

            for (Inventory inventory : inventories) {
                UUID productId =
                        inventory.getVariant()
                                .getProduct()
                                .getId();
                if (byProduct.containsKey(productId)) {
                    byProduct.get(productId).add(inventory);
                }
            }

            for (UUID productId : productIds) {
                List<Inventory> productInventories =
                        byProduct.get(productId);
                if (productInventories == null || productInventories.isEmpty()) {
                    continue;
                }
                content.add(
                        toAdminInventoryProductResponse(productInventories)
                );
            }
        }

        PageResponse<AdminInventoryProductResponse> pageResponse =
                new PageResponse<>(
                        content,
                        productIdsPage.getNumber(),
                        productIdsPage.getSize(),
                        productIdsPage.getTotalElements(),
                        productIdsPage.getTotalPages(),
                        productIdsPage.isFirst(),
                        productIdsPage.isLast()
                );

        AdminInventorySummaryResponse summary =
                buildInventorySummary(normalizedSearch);

        return new AdminInventoryPageResponse(
                pageResponse,
                summary
        );
    }

    private String normalizeInventoryFilter(String filter) {
        if (filter == null || filter.isBlank()) {
            return "ALL";
        }
        return switch (filter.trim().toUpperCase()) {
            case "IN_STOCK" -> "IN_STOCK";
            case "LOW_STOCK" -> "LOW_STOCK";
            case "OUT_OF_STOCK" -> "OUT_OF_STOCK";
            case "HAS_RESERVED_STOCK" -> "HAS_RESERVED_STOCK";
            default -> "ALL";
        };
    }

    private AdminInventorySummaryResponse buildInventorySummary(
            String search) {

        List<Object[]> rows =
                inventoryRepository
                        .findProductInventorySummary(
                                search
                        );

        if (rows.isEmpty()) {

            return new AdminInventorySummaryResponse(
                    0,
                    0,
                    0,
                    0
            );
        }

        long totalProducts = rows.size();

        long availableUnits = 0L;
        long reservedUnits = 0L;
        long outOfStockProducts = 0L;

        for (Object[] row : rows) {

            long available =
                    ((Number) row[1])
                            .longValue();

            long reserved =
                    ((Number) row[2])
                            .longValue();

            availableUnits += available;
            reservedUnits += reserved;

            if (available == 0) {
                outOfStockProducts++;
            }
        }

        return new AdminInventorySummaryResponse(
                totalProducts,
                availableUnits,
                reservedUnits,
                outOfStockProducts
        );
    }

    private AdminInventoryProductResponse toAdminInventoryProductResponse(
            List<Inventory> inventories) {

        Inventory first = inventories.get(0);
        String productName =
                first.getVariant().getProduct().getName();
        UUID productId =
                first.getVariant().getProduct().getId();

        int available = 0;
        int reserved = 0;
        OffsetDateTime latestUpdate = first.getUpdatedAt();

        List<AdminInventoryVariantResponse> variants =
                inventories.stream()
                        .sorted(Comparator.comparing(Inventory::getUpdatedAt).reversed())
                        .map(inventory -> {
                            int variantTotal =
                                    inventory.getAvailableQuantity()
                                            + inventory.getReservedQuantity();
                            return new AdminInventoryVariantResponse(
                                    inventory.getId(),
                                    inventory.getVariant().getId(),
                                    inventory.getVariant().getSku(),
                                    inventory.getVariant().getSize().getLabel(),
                                    inventory.getVariant().getColor().getName(),
                                    inventory.getAvailableQuantity(),
                                    inventory.getReservedQuantity(),
                                    variantTotal,
                                    inventory.getUpdatedAt()
                            );
                        })
                        .toList();

        for (Inventory inventory : inventories) {
            available += inventory.getAvailableQuantity();
            reserved += inventory.getReservedQuantity();
            if (inventory.getUpdatedAt().isAfter(latestUpdate)) {
                latestUpdate = inventory.getUpdatedAt();
            }
        }

        int total = available + reserved;
        String status;
        if (available == 0) {
            status = "OUT_OF_STOCK";
        } else if (available <= LOW_STOCK_THRESHOLD) {
            status = "LOW_STOCK";
        } else {
            status = "IN_STOCK";
        }

        return new AdminInventoryProductResponse(
                productId,
                productName,
                variants.size(),
                available,
                reserved,
                total,
                status,
                latestUpdate,
                variants
        );
    }

    @Override
    public InventoryResponse getInventory(
            UUID variantId) {

        Inventory inventory =
                inventoryRepository
                        .findByVariant_Id(
                                variantId
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Inventory not found for variant: "
                                                + variantId
                                )
                        );

        return toInventoryResponse(
                inventory
        );
    }

    private CustomerResponse toCustomerResponse(
            User user) {

        return new CustomerResponse(

                user.getId(),

                user.getFirstName(),

                user.getLastName(),

                user.getEmail(),

                user.getPhone(),

                user.getRole(),

                user.getVerified(),

                user.getActive(),

                user.getOrders() == null
                        ? 0
                        : user.getOrders().size(),

                user.getCreatedAt()
        );
    }

    @Override
    public List<CustomerResponse> getAllCustomers() {

        return userRepository
                .findAll()
                .stream()
                .map(this::toCustomerResponse)
                .toList();
    }

    @Override
    public CustomerResponse getCustomerById(
            UUID customerId) {

        User user =
                userRepository
                        .findById(customerId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found."
                                )
                        );

        return toCustomerResponse(user);
    }

    @Override
    public DashboardResponse getDashboard() {

        // 1. Dashboard Stats

        DashboardStatsResponse stats =
                new DashboardStatsResponse(

                        orderRepository.getTotalRevenue(),

                        orderRepository.getAverageOrderValue(),

                        orderRepository.count(),

                        userRepository.countByRole(
                                Role.USER
                        ),

                        productRepository.count(),

                        inventoryRepository
                                .countByAvailableQuantityBetween(
                                        1,
                                        10
                                ),

                        inventoryRepository
                                .countByAvailableQuantity(
                                        0
                                )
                );

        // 2. Order Status Analytics

        OrderStatusAnalyticsResponse orderStatus =
                new OrderStatusAnalyticsResponse(

                        orderRepository.countByStatus(
                                OrderStatus.PENDING
                        ),

                        orderRepository.countByStatus(
                                OrderStatus.PAID
                        ),

                        orderRepository.countByStatus(
                                OrderStatus.SHIPPED
                        ),

                        orderRepository.countByStatus(
                                OrderStatus.DELIVERED
                        ),

                        orderRepository.countByStatus(
                                OrderStatus.CANCELLED
                        )
                );

        // 3. Payment Status Analytics

        PaymentStatusAnalyticsResponse paymentStatus =
                new PaymentStatusAnalyticsResponse(

                        paymentRepository
                                .countByPaymentStatus(
                                        PaymentStatus.PENDING
                                ),

                        paymentRepository
                                .countByPaymentStatus(
                                        PaymentStatus.SUCCESS
                                ),

                        paymentRepository
                                .countByPaymentStatus(
                                        PaymentStatus.FAILED
                                )
                );

        // 4. Inventory Analytics

        InventoryAnalyticsResponse inventory =
                new InventoryAnalyticsResponse(

                        inventoryRepository
                                .countByAvailableQuantityGreaterThan(
                                        10
                                ),

                        inventoryRepository
                                .countByAvailableQuantityBetween(
                                        1,
                                        10
                                ),

                        inventoryRepository
                                .countByAvailableQuantity(
                                        0
                                )
                );

        // 5. Top Selling Products

        List<TopProductAnalyticsResponse> topProducts =
                orderRepository
                        .getTopSellingProducts()
                        .stream()
                        .map(row ->
                                new TopProductAnalyticsResponse(

                                        (UUID) row[0],

                                        (String) row[1],

                                        ((Number) row[2])
                                                .longValue()
                                )
                        )
                        .toList();

        // 6. Recent Orders

        List<RecentOrderResponse> recentOrders =
                orderRepository
                        .findTop5ByOrderByCreatedAtDesc()
                        .stream()
                        .map(order ->
                                new RecentOrderResponse(

                                        order.getId(),

                                        order.getOrderNumber(),

                                        order.getUser()
                                                .getFirstName()
                                                + " "
                                                + order.getUser()
                                                .getLastName(),

                                        order.getTotal(),

                                        order.getStatus(),

                                        order.getCreatedAt()
                                )
                        )
                        .toList();

        // 7. Recent Payments

        List<RecentPaymentResponse> recentPayments =
                paymentRepository
                        .findTop5ByOrderByPaidAtDesc()
                        .stream()
                        .map(payment ->
                                new RecentPaymentResponse(

                                        payment.getId(),

                                        payment.getRazorpayPaymentId(),

                                        payment.getOrder()
                                                .getOrderNumber(),

                                        payment.getAmount(),

                                        payment.getPaymentStatus(),

                                        payment.getPaidAt()
                                )
                        )
                        .toList();

        // 8. Monthly Revenue

        List<MonthlyRevenueResponse> monthlyRevenue =
                orderRepository
                        .getMonthlyRevenue()
                        .stream()
                        .map(row ->
                                new MonthlyRevenueResponse(

                                        (String) row[0],

                                        (BigDecimal) row[1]
                                )
                        )
                        .toList();

        // 9. Dashboard Response

        return new DashboardResponse(

                stats,

                monthlyRevenue,

                orderStatus,

                paymentStatus,

                inventory,

                topProducts,

                recentOrders,

                recentPayments
        );
    }

    private User getCurrentAdmin() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ValidationException(
                                "Admin not found."
                        )
                );
    }

    @Override
    public AdminProfileResponse getAdminProfile() {

        User admin =
                getCurrentAdmin();

        return new AdminProfileResponse(

                admin.getId(),

                admin.getFirstName(),

                admin.getLastName(),

                admin.getEmail(),

                admin.getPhone(),

                admin.getRole()
        );
    }

    @Override
    public AdminProfileResponse updateAdminProfile(
            UpdateAdminProfileRequest request) {

        User admin =
                getCurrentAdmin();

        admin.setFirstName(
                request.firstName()
        );

        admin.setLastName(
                request.lastName()
        );

        admin.setPhone(
                request.phoneNumber()
        );

        userRepository.save(admin);

        return new AdminProfileResponse(

                admin.getId(),

                admin.getFirstName(),

                admin.getLastName(),

                admin.getEmail(),

                admin.getPhone(),

                admin.getRole()
        );
    }

    @Override
    public void changeEmail(
            ChangeEmailRequest request) {

        User admin =
                getCurrentAdmin();

        if (!passwordEncoder.matches(
                request.password(),
                admin.getPasswordHash())) {

            throw new ValidationException(
                    "Incorrect password."
            );
        }

        if (userRepository.existsByEmail(
                request.newEmail())) {

            throw new ValidationException(
                    "Email already exists."
            );
        }

        admin.setEmail(
                request.newEmail()
        );

        userRepository.save(admin);
    }

    @Override
    public void changePassword(
            ChangePasswordRequest request) {

        User admin =
                getCurrentAdmin();

        if (!passwordEncoder.matches(
                request.currentPassword(),
                admin.getPasswordHash())) {

            throw new ValidationException(
                    "Current password is incorrect."
            );
        }

        if (!request.newPassword()
                .equals(
                        request.confirmPassword()
                )) {

            throw new ValidationException(
                    "Passwords do not match."
            );
        }

        if (passwordEncoder.matches(
                request.newPassword(),
                admin.getPasswordHash())) {

            throw new ValidationException(
                    "New password must be different from the current password."
            );
        }

        admin.setPasswordHash(
                passwordEncoder.encode(
                        request.newPassword()
                )
        );

        userRepository.save(admin);
    }
}