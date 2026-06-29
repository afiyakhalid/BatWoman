package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.order.OrderResponse;
import com.BatWoman.BatWoman_backend.entity.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderResponse toResponse(Order order);

}
