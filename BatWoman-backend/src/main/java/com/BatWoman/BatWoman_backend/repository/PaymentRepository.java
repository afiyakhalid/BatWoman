package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Payment;
import com.BatWoman.BatWoman_backend.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

    Optional<Payment> findByRazorpayPaymentId(String razorpayPaymentId);

    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);

}
