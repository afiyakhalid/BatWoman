package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.cart.AddToCartRequest;
import com.BatWoman.BatWoman_backend.dto.cart.UpdateCartItemRequest;
import com.BatWoman.BatWoman_backend.dto.cart.CartResponse;

import java.util.UUID;

public interface CartService {

    CartResponse getCart();

    CartResponse addToCart(AddToCartRequest request);

    CartResponse updateCartItem(
            UUID cartItemId,
            UpdateCartItemRequest request
    );

    void removeCartItem(UUID cartItemId);

    void clearCart();

}
