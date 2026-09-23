package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.entity.Order;
import com.BatWoman.BatWoman_backend.entity.Payment;

public interface NotificationService {

    void sendOrderConfirmationEmail(Order order, Payment payment);
}