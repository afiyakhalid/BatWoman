package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.cart.CartResponse;
import com.BatWoman.BatWoman_backend.entity.Cart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {

    CartResponse toResponse(Cart cart);

}