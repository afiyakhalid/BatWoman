package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Payment;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    @Override
    public void sendWelcomeEmail(User user) {

        log.info("Welcome email sent to {}", user.getEmail());
    }

    @Override
    public void sendOrderConfirmation(Order order) {

        log.info("Order confirmation sent for order {}", order.getOrderNumber());
    }

    @Override
    public void sendPaymentSuccessEmail(Payment payment) {

        log.info("Payment success email sent for payment {}", payment.getId());
    }

    @Override
    public void sendOrderShippedEmail(Order order) {

        log.info("Order shipped email sent for order {}", order.getOrderNumber());
    }

    @Override
    public void notifyAdmin(Order order) {

        log.info("Admin notified for order {}", order.getOrderNumber());
    }
}