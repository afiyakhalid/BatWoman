package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.cart.AddToCartRequest;
import com.BatWoman.BatWoman_backend.dto.cart.UpdateCartItemRequest;
import com.BatWoman.BatWoman_backend.dto.cart.CartResponse;
import com.BatWoman.BatWoman_backend.entity.Cart;

import java.util.UUID;

public interface CartService {

    CartResponse getCart();
    Cart getCurrentCart();

    CartResponse addToCart(AddToCartRequest request);

    CartResponse updateCartItem(
            UUID cartItemId,
            UpdateCartItemRequest request
    );

    void removeCartItem(UUID cartItemId);

    void clearCart();

}
