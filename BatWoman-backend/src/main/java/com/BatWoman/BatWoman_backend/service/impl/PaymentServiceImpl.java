package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.config.RazorpayProperties;
import com.BatWoman.BatWoman_backend.dto.payment.CreatePaymentRequest;
import com.BatWoman.BatWoman_backend.dto.payment.PaymentResponse;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.OrderItem;
import com.BatWoman.BatWoman_backend.entity.Payment;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import com.BatWoman.BatWoman_backend.enums.PaymentStatus;
import com.BatWoman.BatWoman_backend.event.OrderPaidEvent;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.CartRepository;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.repository.PaymentRepository;
import com.BatWoman.BatWoman_backend.service.AuthService;
import com.BatWoman.BatWoman_backend.service.InventoryService;
import com.BatWoman.BatWoman_backend.service.NotificationService;
import com.BatWoman.BatWoman_backend.service.PaymentService;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;
    private final AuthService authService;
    private final RazorpayClient razorpayClient;
    private final RazorpayProperties razorpayProperties;
    private final ApplicationEventPublisher eventPublisher;

    // =========================================================
    // 1. CREATE PAYMENT
    // =========================================================
    @Override
    public PaymentResponse createPayment(CreatePaymentRequest request) {

        Order order = orderRepository.findById(request.orderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found."));

        // Security: Ensure order belongs to currently authenticated user
        User currentUser = authService.getCurrentUser();
        if (order.getUser() != null && !order.getUser().getId().equals(currentUser.getId())) {
            throw new ValidationException("You are not authorized to create payment for this order.");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new ValidationException("Payment can only be created for pending orders.");
        }

        Payment payment = Payment.builder()
                .id(UUID.randomUUID())
                .order(order)
                .paymentStatus(PaymentStatus.PENDING)
                .amount(order.getTotal())
                .currency("INR")
                .createdAt(OffsetDateTime.now())
                .updatedAt(OffsetDateTime.now())
                .build();

        try {
            JSONObject options = new JSONObject();

            // Convert amount to paise safely using RoundingMode
            long amountInPaise = payment.getAmount()
                    .multiply(BigDecimal.valueOf(100))
                    .setScale(0, RoundingMode.HALF_UP)
                    .longValue();

            options.put("amount", amountInPaise);
            options.put("currency", payment.getCurrency());
            options.put("receipt", order.getOrderNumber());

            com.razorpay.Order razorpayOrder = razorpayClient.orders.create(options);
            payment.setRazorpayOrderId((String) razorpayOrder.get("id"));

        } catch (RazorpayException ex) {
            log.error("Unable to create Razorpay Order for order: {}", order.getOrderNumber(), ex);
            throw new RuntimeException("Unable to create Razorpay Order.", ex);
        }

        paymentRepository.save(payment);

        return toPaymentResponse(payment);
    }

    // =========================================================
    // 2. VERIFY PAYMENT (Frontend Interactive Flow)
    // =========================================================
    @Override
    public PaymentResponse verifyPayment(
            UUID paymentId,
            String razorpayPaymentId,
            String razorpaySignature) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found."));

        // Security: Ensure payment belongs to currently authenticated user
        User currentUser = authService.getCurrentUser();
        if (payment.getOrder().getUser() != null
                && !payment.getOrder().getUser().getId().equals(currentUser.getId())) {
            throw new ValidationException("You are not authorized to verify this payment.");
        }

        // Idempotency: If already success, return without duplicate work
        if (payment.getPaymentStatus() == PaymentStatus.SUCCESS) {
            log.info("Payment {} is already marked SUCCESS.", paymentId);
            return toPaymentResponse(payment);
        }

        // Signature Verification
        JSONObject attributes = new JSONObject();
        attributes.put("razorpay_order_id", payment.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", razorpayPaymentId);
        attributes.put("razorpay_signature", razorpaySignature);

        try {
            boolean isValid = Utils.verifyPaymentSignature(
                    attributes,
                    razorpayProperties.getKeySecret()
            );

            if (!isValid) {
                throw new ValidationException("Invalid Razorpay payment signature.");
            }
        } catch (ValidationException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("Payment signature verification failed", ex);
            throw new ValidationException("Invalid Razorpay payment signature.");
        }

        // Process common success logic
        return processPaymentSuccess(payment, razorpayPaymentId, razorpaySignature);
    }

    // =========================================================
    // 3. PAYMENT FAILURE / CANCELLATION
    // =========================================================
    @Override
    public void handlePaymentFailure(UUID paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found."));

        // Security: Ensure payment belongs to currently authenticated user
        User currentUser = authService.getCurrentUser();
        if (payment.getOrder().getUser() != null
                && !payment.getOrder().getUser().getId().equals(currentUser.getId())) {
            throw new ValidationException("You are not authorized to cancel this payment.");
        }

        handlePaymentFailureInternal(payment);
    }

    // =========================================================
    // 4. RAZORPAY WEBHOOK (Automated Background Fallback)
    // =========================================================
    @Override
    public void handleWebhook(String payload, String signature) {

        log.info("========== RAZORPAY WEBHOOK RECEIVED ==========");

        if (signature == null || signature.isBlank()) {
            log.error("Missing X-Razorpay-Signature in webhook request.");
            throw new ValidationException("Missing webhook signature.");
        }

        // Use webhook secret if configured, fallback to keySecret
        String secret = razorpayProperties.getEffectiveWebhookSecret();

        try {
            boolean isValid = Utils.verifyWebhookSignature(payload, signature, secret);
            if (!isValid) {
                log.error("Invalid Razorpay webhook signature.");
                throw new ValidationException("Invalid Razorpay webhook signature.");
            }
        } catch (Exception ex) {
            log.error("Failed to verify Razorpay webhook signature", ex);
            throw new ValidationException("Invalid Razorpay webhook signature.");
        }

        JSONObject event = new JSONObject(payload);
        String eventType = event.optString("event");
        log.info("Processing Razorpay webhook event: {}", eventType);

        JSONObject payloadObj = event.optJSONObject("payload");
        if (payloadObj == null) {
            log.warn("Webhook payload does not contain data payload.");
            return;
        }

        if ("payment.captured".equals(eventType) || "order.paid".equals(eventType)) {

            String razorpayOrderId = null;
            String razorpayPaymentId = null;

            if (payloadObj.has("payment")) {
                JSONObject paymentEntity = payloadObj.getJSONObject("payment").optJSONObject("entity");
                if (paymentEntity != null) {
                    razorpayOrderId = paymentEntity.optString("order_id");
                    razorpayPaymentId = paymentEntity.optString("id");
                }
            } else if (payloadObj.has("order")) {
                JSONObject orderEntity = payloadObj.getJSONObject("order").optJSONObject("entity");
                if (orderEntity != null) {
                    razorpayOrderId = orderEntity.optString("id");
                }
            }

            if (razorpayOrderId == null || razorpayOrderId.isBlank()) {
                log.warn("Webhook event {} missing razorpay order_id.", eventType);
                return;
            }

            Payment payment = paymentRepository.findByRazorpayOrderId(razorpayOrderId)
                    .orElse(null);

            if (payment == null) {
                log.warn("No local payment found for Razorpay order ID: {}", razorpayOrderId);
                return;
            }

            processPaymentSuccess(payment, razorpayPaymentId, null);
            log.info("Webhook successfully processed {} for order {}", eventType, payment.getOrder().getOrderNumber());

        } else if ("payment.failed".equals(eventType)) {

            JSONObject paymentObj = payloadObj.optJSONObject("payment");
            if (paymentObj != null) {
                JSONObject entity = paymentObj.optJSONObject("entity");
                if (entity != null) {
                    String razorpayOrderId = entity.optString("order_id");
                    if (razorpayOrderId != null && !razorpayOrderId.isBlank()) {
                        paymentRepository.findByRazorpayOrderId(razorpayOrderId)
                                .ifPresent(this::handlePaymentFailureInternal);
                    }
                }
            }
        }
    }

    // =========================================================
    // HELPER: PROCESS SUCCESSFUL PAYMENT
    // =========================================================
    private PaymentResponse processPaymentSuccess(
            Payment payment,
            String razorpayPaymentId,
            String razorpaySignature) {

        // Idempotency: If already processed, return immediately
        if (payment.getPaymentStatus() == PaymentStatus.SUCCESS) {
            return toPaymentResponse(payment);
        }

        if (razorpayPaymentId != null) {
            payment.setRazorpayPaymentId(razorpayPaymentId);
        }
        if (razorpaySignature != null) {
            payment.setRazorpaySignature(razorpaySignature);
        }
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaidAt(OffsetDateTime.now());
        payment.setUpdatedAt(OffsetDateTime.now());

        paymentRepository.save(payment);

        Order order = payment.getOrder();
        order.setStatus(OrderStatus.PAID);
        order.setUpdatedAt(OffsetDateTime.now());

        orderRepository.save(order);

        // 1. Publish OrderPaidEvent (triggers local shipment creation AFTER_COMMIT)
        log.info("Publishing OrderPaidEvent for order: {}", order.getId());
        eventPublisher.publishEvent(new OrderPaidEvent(order.getId()));

        // 2. Reduce variant inventory permanently
        for (OrderItem item : order.getOrderItems()) {
            if (item.getVariant() != null) {
                inventoryService.reduceInventory(
                        item.getVariant().getId(),
                        item.getQuantity()
                );
            }
        }

        // 3. Clear Customer Cart safely (works for both user session & webhook)
        clearCustomerCart(order.getUser());

        // 4. Send Confirmation Notifications
        try {
            notificationService.sendOrderConfirmationEmail(order, payment);
        } catch (Exception ex) {
            log.error("Failed to send order confirmation email for order {}", order.getOrderNumber(), ex);
        }

        return toPaymentResponse(payment);
    }

    // =========================================================
    // HELPER: PROCESS FAILED PAYMENT
    // =========================================================
    private void handlePaymentFailureInternal(Payment payment) {

        if (payment.getPaymentStatus() == PaymentStatus.FAILED) {
            return;
        }

        if (payment.getPaymentStatus() == PaymentStatus.SUCCESS) {
            log.warn("Cannot mark a SUCCESS payment as FAILED: {}", payment.getId());
            return;
        }

        Order order = payment.getOrder();
        if (order.getStatus() != OrderStatus.PENDING) {
            return;
        }

        // Release reserved inventory back to stock
        for (OrderItem item : order.getOrderItems()) {
            if (item.getVariant() != null) {
                inventoryService.releaseInventory(
                        item.getVariant().getId(),
                        item.getQuantity()
                );
            }
        }

        payment.setPaymentStatus(PaymentStatus.FAILED);
        payment.setUpdatedAt(OffsetDateTime.now());
        paymentRepository.save(payment);

        order.setStatus(OrderStatus.FAILED);
        order.setUpdatedAt(OffsetDateTime.now());
        orderRepository.save(order);

        log.info("Payment {} marked FAILED. Inventory released for order {}.",
                payment.getId(), order.getOrderNumber());
    }

    // =========================================================
    // HELPER: CLEAR CUSTOMER CART
    // =========================================================
    private void clearCustomerCart(User user) {
        if (user == null) {
            return;
        }
        try {
            cartRepository.findByUser_Id(user.getId()).ifPresent(cart -> {
                cart.getCartItems().clear();
                cart.setUpdatedAt(OffsetDateTime.now());
                cartRepository.save(cart);
                log.info("Cart cleared for user: {}", user.getId());
            });
        } catch (Exception ex) {
            log.warn("Could not clear cart for user {}: {}", user.getId(), ex.getMessage());
        }
    }

    private PaymentResponse toPaymentResponse(Payment payment) {
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
}