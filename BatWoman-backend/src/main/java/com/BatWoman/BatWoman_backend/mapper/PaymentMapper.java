package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.payment.PaymentResponse;
import com.BatWoman.BatWoman_backend.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(target = "paymentId", source = "id")
    @Mapping(target = "orderId", source = "order.id")
    @Mapping(target = "status", source = "paymentStatus")
    PaymentResponse toResponse(Payment payment);

}