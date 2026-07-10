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

        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            ProductImage image =
                    productImageRepository.findByProductAndPrimaryTrue(product);

            String objectKey =
                    image != null
                            ? image.getObjectKey()
                            : null;

            BigDecimal unitPrice =
                    product.getDiscountPrice() != null
                            ? product.getDiscountPrice()
                            : product.getPrice();

            BigDecimal itemSubtotal =
                    unitPrice.multiply(
                            BigDecimal.valueOf(cartItem.getQuantity())
                    );

            subtotal = subtotal.add(itemSubtotal);

            items.add(

                    new CartResponse.CartItemResponse(

                            cartItem.getId(),

                            product.getId(),

                            product.getName(),

                            objectKey,

                            cartItem.getQuantity(),

                            unitPrice,

                            itemSubtotal,

                            product.getCategory().getName()

                    )
            );
        }

        BigDecimal shipping = BigDecimal.ZERO;

        BigDecimal total = subtotal.add(shipping);

        return new CartResponse(

                cart.getId(),

                items,

                subtotal,

                shipping,

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

        if (!Boolean.TRUE.equals(product.getActive())) {
            throw new ValidationException("This product is no longer available.");
        }

        Inventory inventory = product.getInventory();

        if (inventory == null) {
            throw new ValidationException("Inventory not found.");
        }

        CartItem cartItem = cartItemRepository
                .findByCart_IdAndProduct_Id(
                        cart.getId(),
                        product.getId()
                )
                .orElse(null);

        if (cartItem != null) {

            int newQuantity =
                    cartItem.getQuantity() + request.quantity();

            if (newQuantity > inventory.getAvailableQuantity()) {
                throw new ValidationException("Not enough stock available.");
            }

            cartItem.setQuantity(newQuantity);

        } else {

            if (request.quantity() > inventory.getAvailableQuantity()) {
                throw new ValidationException("Not enough stock available.");
            }

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
        Inventory inventory =
                cartItem.getProduct().getInventory();

        if (request.quantity() > inventory.getAvailableQuantity()) {
            throw new ValidationException("Not enough stock available.");
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

        User currentUser = authService.getCurrentUser();

        if (!cartItem.getCart().getUser().getId().equals(currentUser.getId())) {
            throw new ValidationException(
                    "You cannot modify another user's cart.");
        }

        Cart cart = cartItem.getCart();

        cartItemRepository.delete(cartItem);

        cart.setUpdatedAt(OffsetDateTime.now());

        cartRepository.save(cart);
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
