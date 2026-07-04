package com.BatWoman.BatWoman_backend.service.impl;

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
import com.BatWoman.BatWoman_backend.service.InventoryService;
import com.BatWoman.BatWoman_backend.service.NotificationService;
import com.BatWoman.BatWoman_backend.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    private final OrderRepository orderRepository;

    private final InventoryService inventoryService;

    private final NotificationService notificationService;

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
                .build();

    /*
        Razorpay integration comes here.

        razorpayOrderId = razorpay.orders.create(...)

        payment.setRazorpayOrderId(...);
    */

        payment.setRazorpayOrderId(
                UUID.randomUUID().toString()
        );

        paymentRepository.save(payment);

        return new PaymentResponse(

                payment.getId(),

                order.getId(),

                payment.getRazorpayOrderId(),

                null,

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

    /*
        Later:

        Verify Razorpay Signature
    */

        payment.setRazorpayPaymentId(
                razorpayPaymentId);

        payment.setRazorpaySignature(
                razorpaySignature);

        payment.setPaymentStatus(
                PaymentStatus.SUCCESS);

        payment.setPaidAt(
                OffsetDateTime.now());

        payment.setUpdatedAt(
                OffsetDateTime.now());

        paymentRepository.save(payment);

        Order order = payment.getOrder();

        order.setStatus(OrderStatus.PAID);

        order.setUpdatedAt(OffsetDateTime.now());

        orderRepository.save(order);

        for (OrderItem item : order.getOrderItems()) {

            inventoryService.reduceInventory(

                    item.getProduct().getId(),

                    item.getQuantity()
            );
        }

        notificationService.sendPaymentSuccessEmail(payment);

        notificationService.sendOrderConfirmation(order);

        return new PaymentResponse(

                payment.getId(),

                order.getId(),

                payment.getRazorpayOrderId(),

                payment.getRazorpayPaymentId(),

                payment.getPaymentStatus(),

                payment.getPaidAt()
        );
    }

    @Override
    public void handleWebhook(
            String payload,
            String signature) {

    /*
        Later we'll verify the Razorpay webhook
        signature and update payments.

        Currently no implementation.
    */
    }
}
