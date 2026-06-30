package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.cart.AddToCartRequest;
import com.BatWoman.BatWoman_backend.dto.cart.CartResponse;
import com.BatWoman.BatWoman_backend.dto.cart.UpdateCartItemRequest;
import com.BatWoman.BatWoman_backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart() {

        return ResponseEntity.ok(
                cartService.getCart()
        );
    }

    @PostMapping
    public ResponseEntity<CartResponse> addToCart(

            @Valid @RequestBody AddToCartRequest request) {

        return ResponseEntity.ok(
                cartService.addToCart(request)
        );
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(

            @PathVariable UUID cartItemId,

            @Valid @RequestBody UpdateCartItemRequest request) {

        return ResponseEntity.ok(
                cartService.updateCartItem(
                        cartItemId,
                        request
                )
        );
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(

            @PathVariable UUID cartItemId) {

        cartService.removeCartItem(cartItemId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() {

        cartService.clearCart();

        return ResponseEntity.noContent().build();
    }
}