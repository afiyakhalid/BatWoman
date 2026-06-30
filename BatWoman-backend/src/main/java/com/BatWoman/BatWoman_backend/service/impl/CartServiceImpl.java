package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.cart.CartResponse;
import com.BatWoman.BatWoman_backend.dto.cart.AddToCartRequest;
import com.BatWoman.BatWoman_backend.dto.cart.UpdateCartItemRequest;
import com.BatWoman.BatWoman_backend.entity.*;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.*;
import com.BatWoman.BatWoman_backend.service.AuthService;
import com.BatWoman.BatWoman_backend.service.CartService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final AuthService authService;

    private Cart getOrCreateCart() {

        User user = authService.getCurrentUser();

        return cartRepository.findByUser_Id(user.getId())
                .orElseGet(() -> {

                    Cart cart = Cart.builder()
                            .id(UUID.randomUUID())
                            .user(user)
                            .createdAt(OffsetDateTime.now())
                            .updatedAt(OffsetDateTime.now())
                            .build();

                    return cartRepository.save(cart);
                });
    }

    private CartResponse buildCartResponse(Cart cart) {

        List<CartItem> cartItems =
                cartItemRepository.findByCart_Id(cart.getId());

        List<CartResponse.CartItemResponse> items =
                new ArrayList<>();

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            ProductImage image =
                    productImageRepository.findByProductAndPrimaryTrue(product);

            String objectKey =
                    image != null ? image.getObjectKey() : null;

            BigDecimal subtotal =
                    product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            cartItem.getQuantity()));

            total = total.add(subtotal);

            items.add(

                    new CartResponse.CartItemResponse(

                            cartItem.getId(),

                            product.getId(),

                            product.getName(),

                            objectKey,

                            cartItem.getQuantity(),

                            product.getPrice(),

                            subtotal
                    )
            );
        }

        return new CartResponse(

                cart.getId(),

                items,

                total
        );
    }

    @Override
    public CartResponse getCart() {

        Cart cart = getOrCreateCart();

        return buildCartResponse(cart);
    }

    @Override
    public CartResponse addToCart(AddToCartRequest request) {

        Cart cart = getOrCreateCart();

        Product product = productRepository.findById(request.productId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        CartItem cartItem = cartItemRepository
                .findByCart_IdAndProduct_Id(
                        cart.getId(),
                        product.getId()
                )
                .orElse(null);

        if (cartItem != null) {

            cartItem.setQuantity(
                    cartItem.getQuantity() + request.quantity()
            );

        } else {

            cartItem = CartItem.builder()
                    .id(UUID.randomUUID())
                    .cart(cart)
                    .product(product)
                    .quantity(request.quantity())
                    .createdAt(OffsetDateTime.now())
                    .build();
        }

        cartItemRepository.save(cartItem);

        cart.setUpdatedAt(OffsetDateTime.now());

        cartRepository.save(cart);

        return buildCartResponse(cart);
    }

    @Override
    public CartResponse updateCartItem(
            UUID cartItemId,
            UpdateCartItemRequest request) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart item not found."));

        User currentUser = authService.getCurrentUser();

        if (!cartItem.getCart().getUser().getId().equals(currentUser.getId())) {
            throw new ValidationException("You cannot modify another user's cart.");
        }

        cartItem.setQuantity(request.quantity());

        cartItemRepository.save(cartItem);

        Cart cart = cartItem.getCart();

        cart.setUpdatedAt(OffsetDateTime.now());

        cartRepository.save(cart);

        return buildCartResponse(cart);
    }

    @Override
    public void removeCartItem(UUID cartItemId) {

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart item not found."));

        Cart cart = cartItem.getCart();

        cartItemRepository.delete(cartItem);

        cart.setUpdatedAt(OffsetDateTime.now());

        cartRepository.save(cart);
        User currentUser = authService.getCurrentUser();

        if (!cartItem.getCart().getUser().getId().equals(currentUser.getId())) {
            throw new ValidationException("You cannot modify another user's cart.");
        }
    }

    @Override
    public void clearCart() {

        Cart cart = getOrCreateCart();

        cartItemRepository.deleteByCart_Id(cart.getId());

        cart.setUpdatedAt(OffsetDateTime.now());

        cartRepository.save(cart);
    }
    @Override
    public Cart getCurrentCart() {

        return getOrCreateCart();
    }
}
