package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Payment;
import com.BatWoman.BatWoman_backend.entity.User;

public interface NotificationService {

    /**
     * Welcome email after registration.
     */
    void sendWelcomeEmail(User user);

    /**
     * Order confirmation email.
     */
    void sendOrderConfirmation(Order order);

    /**
     * Payment successful email.
     */
    void sendPaymentSuccessEmail(Payment payment);

    /**
     * Order shipped email.
     */
    void sendOrderShippedEmail(Order order);

    /**
     * Notify admin about a new order.
     */
    void notifyAdmin(Order order);

}
