package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.config.RazorpayProperties;
import com.BatWoman.BatWoman_backend.dto.payment.CreatePaymentRequest;
import com.BatWoman.BatWoman_backend.dto.payment.PaymentResponse;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.OrderItem;
import com.BatWoman.BatWoman_backend.entity.Payment;
import com.BatWoman.BatWoman_backend.enums.OrderStatus;
import com.BatWoman.BatWoman_backend.enums.PaymentStatus;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.repository.PaymentRepository;
import com.BatWoman.BatWoman_backend.service.CartService;
import com.BatWoman.BatWoman_backend.service.InventoryService;
import com.BatWoman.BatWoman_backend.service.NotificationService;
import com.BatWoman.BatWoman_backend.service.PaymentService;
import com.BatWoman.BatWoman_backend.service.ShipmentService;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final InventoryService inventoryService;
    private final CartService cartService;
    private final NotificationService notificationService;
    private final ShipmentService shipmentService;
    private final RazorpayClient razorpayClient;
    private final RazorpayProperties razorpayProperties;

    @Override
    public PaymentResponse createPayment(CreatePaymentRequest request) {

        Order order = orderRepository.findById(request.orderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found."));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new ValidationException(
                    "Payment can only be created for pending orders.");
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

            options.put(
                    "amount",
                    payment.getAmount()
                            .multiply(java.math.BigDecimal.valueOf(100))
                            .intValueExact()
            );

            options.put("currency", payment.getCurrency());
            options.put("receipt", order.getOrderNumber());

            // Fully qualified reference to avoid collision with Entity Order
            com.razorpay.Order razorpayOrder =
                    razorpayClient.orders.create(options);

            payment.setRazorpayOrderId(
                    (String) razorpayOrder.get("id")
            );

        } catch (RazorpayException ex) {
            throw new RuntimeException(
                    "Unable to create Razorpay Order.",
                    ex
            );
        }

        paymentRepository.save(payment);

        return new PaymentResponse(
                payment.getId(),
                order.getId(),
                payment.getRazorpayOrderId(),
                null,
                payment.getAmount(),
                payment.getCurrency(),
                payment.getPaymentStatus(),
                null
        );
    }

    @Override
    public PaymentResponse verifyPayment(
            UUID paymentId,
            String razorpayPaymentId,
            String razorpaySignature) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found."));

        // 1. Idempotency Check
        if (payment.getPaymentStatus() == PaymentStatus.SUCCESS) {
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

        // 2. Build Attributes for Signature Verification
        System.out.println("========== VERIFY START ==========");
        System.out.println("Secret = " + razorpayProperties.getKeySecret());

        JSONObject attributes = new JSONObject();
        attributes.put("razorpay_order_id", payment.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", razorpayPaymentId);
        attributes.put("razorpay_signature", razorpaySignature);

        System.out.println(attributes);

        // 3. Signature Verification Execution
        try {
            boolean isValid = Utils.verifyPaymentSignature(
                    attributes,
                    razorpayProperties.getKeySecret()
            );

            System.out.println("isValid = " + isValid);

            if (!isValid) {
                throw new ValidationException("Invalid Razorpay payment signature.");
            }

        } catch (ValidationException ex) {
            throw ex;
        } catch (Exception ex) {
            System.out.println("EXCEPTION THROWN");
            ex.printStackTrace();
            throw new ValidationException("Invalid Razorpay payment signature.");
        }

        // 4. Update Payment Record
        payment.setRazorpayPaymentId(razorpayPaymentId);
        payment.setRazorpaySignature(razorpaySignature);
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setPaidAt(OffsetDateTime.now());
        payment.setUpdatedAt(OffsetDateTime.now());

        paymentRepository.save(payment);

        // 5. Update Order Status
        Order order = payment.getOrder();
        order.setStatus(OrderStatus.PAID);
        order.setUpdatedAt(OffsetDateTime.now());

        orderRepository.save(order);

        // 6. Automatically Create Shipment
        System.out.println(">>> Creating shipment for order: " + order.getId());
        shipmentService.createShipment(order);
        System.out.println(">>> Shipment created successfully");

        // 7. Reduce Inventory
        for (OrderItem item : order.getOrderItems()) {
            inventoryService.reduceInventory(
                    item.getProduct().getId(),
                    item.getQuantity()
            );
        }

        // 8. Clear Customer Cart
        cartService.clearCart();

        // 9. Send Notifications
        notificationService.sendPaymentSuccessEmail(payment);
        notificationService.sendOrderConfirmation(order);

        return new PaymentResponse(
                payment.getId(),
                order.getId(),
                payment.getRazorpayOrderId(),
                payment.getRazorpayPaymentId(),
                payment.getAmount(),
                payment.getCurrency(),
                payment.getPaymentStatus(),
                payment.getPaidAt()
        );
    }

    @Override
    public void handleWebhook(
            String payload,
            String signature) {

        // TODO: Handle Razorpay Webhook

    }
}