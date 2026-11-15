package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Payment;
import com.BatWoman.BatWoman_backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    // Primary email provider: Gmail
    private final JavaMailSender mailSender;

    // Fallback email provider: Brevo
    @Qualifier("brevoMailSender")
    private final JavaMailSender brevoMailSender;

    private static final String SUBJECT =
            "Order Confirmed & Payment Successful — ZubaydaByA3";

    @Override
    public void sendOrderConfirmationEmail(Order order, Payment payment) {

        String customerEmail = getCustomerEmail(order);

        if (customerEmail == null || customerEmail.isBlank()) {
            log.warn(
                    "Unable to send order confirmation email. No customer email for order {}",
                    order.getOrderNumber()
            );
            return;
        }

        String message = buildEmailContent(order, payment);

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(customerEmail);
        email.setSubject(SUBJECT);
        email.setText(message);

        // Attempt 1: Gmail (primary provider)
        try {
            mailSender.send(email);

            log.info(
                    "Order confirmation email sent successfully through Gmail for order {}",
                    order.getOrderNumber()
            );

            return;

        } catch (Exception gmailException) {
            log.error(
                    "Gmail failed to send order confirmation for order {}. Attempting Brevo fallback.",
                    order.getOrderNumber(),
                    gmailException
            );
        }

        // Attempt 2: Brevo (fallback provider)
        try {
            brevoMailSender.send(email);

            log.info(
                    "Order confirmation email sent successfully through Brevo fallback for order {}",
                    order.getOrderNumber()
            );

        } catch (Exception brevoException) {
            /*
             * Email failure must not affect a successful payment.
             * The order and payment have already been completed.
             */
            log.error(
                    "Both Gmail and Brevo failed to send order confirmation for order {}",
                    order.getOrderNumber(),
                    brevoException
            );
        }
    }

    private String getCustomerEmail(Order order) {

        if (order.getUser() != null
                && order.getUser().getEmail() != null
                && !order.getUser().getEmail().isBlank()) {

            return order.getUser().getEmail();
        }

        return order.getGuestEmail();
    }

    private String buildEmailContent(Order order, Payment payment) {

        BigDecimal total = order.getTotal();

        return """
                Dear Customer,

                Thank you for shopping with ZubaydaByA3.

                We are pleased to confirm that your payment has been successfully
                received and your order has been confirmed.

                --------------------------------------------------
                ORDER DETAILS
                --------------------------------------------------

                Order Number : %s
                Order Status : Confirmed
                Payment Status : Paid
                Order Total : ₹%s

                --------------------------------------------------

                Your order is now being prepared for shipment.

                Once your order has been shipped, we will send you another
                email with the shipping and tracking details.

                Thank you for choosing ZubaydaByA3.

                Warm regards,
                ZubaydaByA3 Team
                Luxury Abayas & Modest Fashion
                """.formatted(
                order.getOrderNumber(),
                total
        );
    }
}
