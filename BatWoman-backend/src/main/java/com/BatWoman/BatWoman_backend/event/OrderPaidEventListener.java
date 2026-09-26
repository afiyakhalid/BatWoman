package com.BatWoman.BatWoman_backend.event;

import com.BatWoman.BatWoman_backend.dto.shipping.CreateShipmentRequest;
import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.repository.OrderRepository;
import com.BatWoman.BatWoman_backend.service.ShippingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class OrderPaidEventListener {

    private final OrderRepository orderRepository;
    private final ShippingService shipmentService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleOrderPaid(OrderPaidEvent event) {

        log.info(
                "========== ORDER PAID EVENT RECEIVED: {} ==========",
                event.orderId()
        );

        Order order = orderRepository.findById(event.orderId())
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Order not found after payment commit: "
                                        + event.orderId()
                        )
                );

        log.info(
                "Payment committed successfully for order {}. Starting shipment processing.",
                order.getOrderNumber()
        );

        try {

            shipmentService.createShipment(
                    new CreateShipmentRequest(order.getId())
            );

            log.info(
                    "Shipment processing started successfully for order {}.",
                    order.getOrderNumber()
            );

        } catch (Exception ex) {

            log.error(
                    "Failed to start shipment processing for order {} after payment commit.",
                    order.getOrderNumber(),
                    ex
            );
        }
    }
}