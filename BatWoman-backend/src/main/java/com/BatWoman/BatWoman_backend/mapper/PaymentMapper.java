package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.payment.response.PaymentResponse;
import com.BatWoman.BatWoman_backend.entity.Payment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    PaymentResponse toResponse(Payment payment);

}