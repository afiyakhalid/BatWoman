package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.cart.AddToCartRequest;
import com.BatWoman.BatWoman_backend.dto.cart.CartResponse;
import com.BatWoman.BatWoman_backend.dto.cart.UpdateCartItemRequest;
import com.BatWoman.BatWoman_backend.entity.Cart;
import com.BatWoman.BatWoman_backend.entity.CartItem;
import com.BatWoman.BatWoman_backend.entity.Inventory;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductMedia;
import com.BatWoman.BatWoman_backend.entity.ProductVariant;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.CartItemRepository;
import com.BatWoman.BatWoman_backend.repository.CartRepository;
import com.BatWoman.BatWoman_backend.repository.ProductMediaRepository;
import com.BatWoman.BatWoman_backend.repository.ProductVariantRepository;
import com.BatWoman.BatWoman_backend.service.AuthService;
import com.BatWoman.BatWoman_backend.service.CartService;
import com.BatWoman.BatWoman_backend.service.S3Service;
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

    private final ProductVariantRepository productVariantRepository;

    private final ProductMediaRepository productMediaRepository;

    private final AuthService authService;

    private final S3Service s3Service;


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


    private CartResponse buildCartResponse(
            Cart cart) {

        List<CartItem> cartItems =
                cartItemRepository.findByCart_Id(
                        cart.getId()
                );

        List<CartResponse.CartItemResponse> items =
                new ArrayList<>();

        BigDecimal subtotal =
                BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {

            ProductVariant variant =
                    cartItem.getVariant();

            if (variant == null) {
                throw new ValidationException(
                        "Cart item is missing its product variant."
                );
            }

            Product product =
                    variant.getProduct();

            if (product == null) {
                throw new ValidationException(
                        "Cart item variant is missing its product."
                );
            }

            ProductMedia media =
                    productMediaRepository
                            .findByProductAndPrimaryMediaTrue(
                                    product
                            )
                            .orElse(null);

            String mediaUrl =
                    media != null
                            ? s3Service.generatePresignedUrl(
                            media.getObjectKey()
                    )
                            : null;

            BigDecimal unitPrice =
                    product.getDiscountPrice() != null
                            ? product.getDiscountPrice()
                            : product.getPrice();

            BigDecimal itemSubtotal =
                    unitPrice.multiply(
                            BigDecimal.valueOf(
                                    cartItem.getQuantity()
                            )
                    );

            subtotal =
                    subtotal.add(itemSubtotal);

            String size =
                    variant.getSize() != null
                            ? variant.getSize().getLabel()
                            : null;

            String color =
                    variant.getColor() != null
                            ? variant.getColor().getName()
                            : null;

            items.add(
                    new CartResponse.CartItemResponse(
                            cartItem.getId(),
                            product.getId(),
                            variant.getId(),
                            product.getName(),
                            variant.getSku(),
                            size,
                            color,
                            mediaUrl,
                            cartItem.getQuantity(),
                            unitPrice,
                            itemSubtotal,
                            product.getCategory().getName()
                    )
            );
        }

        BigDecimal shipping =
                BigDecimal.ZERO;

        BigDecimal total =
                subtotal.add(shipping);

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

        Cart cart =
                getOrCreateCart();

        return buildCartResponse(cart);
    }


    @Override
    public CartResponse addToCart(
            AddToCartRequest request) {

        Cart cart =
                getOrCreateCart();

        ProductVariant variant =
                productVariantRepository
                        .findById(request.variantId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product variant not found."
                                )
                        );

        Product product =
                variant.getProduct();

        if (product == null) {
            throw new ValidationException(
                    "Product variant is not associated with a product."
            );
        }

        if (!Boolean.TRUE.equals(
                product.getActive()
        )) {

            throw new ValidationException(
                    "This product is no longer available."
            );
        }

        if (!Boolean.TRUE.equals(
                variant.getActive()
        )) {

            throw new ValidationException(
                    "This product variant is no longer available."
            );
        }

        Inventory inventory =
                variant.getInventory();

        if (inventory == null) {
            throw new ValidationException(
                    "Inventory not found for this product variant."
            );
        }

        if (request.quantity() == null
                || request.quantity() < 1) {

            throw new ValidationException(
                    "Quantity must be at least 1."
            );
        }

        CartItem cartItem =
                cartItemRepository
                        .findByCart_IdAndVariant_Id(
                                cart.getId(),
                                variant.getId()
                        )
                        .orElse(null);

        if (cartItem != null) {

            int newQuantity =
                    cartItem.getQuantity()
                            + request.quantity();

            if (
                    newQuantity
                            > inventory.getAvailableQuantity()
            ) {

                throw new ValidationException(
                        "Requested quantity exceeds available stock. Only "
                                + inventory.getAvailableQuantity()
                                + " item(s) available."
                );
            }

            cartItem.setQuantity(
                    newQuantity
            );

        } else {

            if (
                    request.quantity()
                            > inventory.getAvailableQuantity()
            ) {

                throw new ValidationException(
                        "Requested quantity exceeds available stock. Only "
                                + inventory.getAvailableQuantity()
                                + " item(s) available."
                );
            }

            cartItem =
                    CartItem.builder()
                            .id(UUID.randomUUID())
                            .cart(cart)
                            .variant(variant)
                            .quantity(request.quantity())
                            .createdAt(
                                    OffsetDateTime.now()
                            )
                            .build();
        }

        cartItemRepository.save(
                cartItem
        );

        cart.setUpdatedAt(
                OffsetDateTime.now()
        );

        cartRepository.save(
                cart
        );

        return buildCartResponse(
                cart
        );
    }


    @Override
    public CartResponse updateCartItem(
            UUID cartItemId,
            UpdateCartItemRequest request) {

        CartItem cartItem =
                cartItemRepository.findById(
                                cartItemId
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Cart item not found."
                                )
                        );

        User currentUser =
                authService.getCurrentUser();

        if (
                !cartItem
                        .getCart()
                        .getUser()
                        .getId()
                        .equals(
                                currentUser.getId()
                        )
        ) {

            throw new ValidationException(
                    "You cannot modify another user's cart."
            );
        }

        ProductVariant variant =
                cartItem.getVariant();

        if (variant == null) {
            throw new ValidationException(
                    "Cart item is missing its product variant."
            );
        }

        if (!Boolean.TRUE.equals(
                variant.getActive()
        )) {

            throw new ValidationException(
                    "This product variant is no longer available."
            );
        }

        Inventory inventory =
                variant.getInventory();

        if (inventory == null) {
            throw new ValidationException(
                    "Inventory not found for this product variant."
            );
        }

        if (
                request.quantity()
                        > inventory.getAvailableQuantity()
        ) {

            throw new ValidationException(
                    "Requested quantity exceeds available stock. Only "
                            + inventory.getAvailableQuantity()
                            + " item(s) available."
            );
        }

        cartItem.setQuantity(
                request.quantity()
        );

        cartItemRepository.save(
                cartItem
        );

        Cart cart =
                cartItem.getCart();

        cart.setUpdatedAt(
                OffsetDateTime.now()
        );

        cartRepository.save(
                cart
        );

        return buildCartResponse(
                cart
        );
    }


    @Override
    public void removeCartItem(
            UUID cartItemId) {

        CartItem cartItem =
                cartItemRepository.findById(
                                cartItemId
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Cart item not found."
                                )
                        );

        User currentUser =
                authService.getCurrentUser();

        if (
                !cartItem
                        .getCart()
                        .getUser()
                        .getId()
                        .equals(
                                currentUser.getId()
                        )
        ) {

            throw new ValidationException(
                    "You cannot modify another user's cart."
            );
        }

        Cart cart =
                cartItem.getCart();

        /*
         * Remove the CartItem from the managed Cart collection.
         *
         * Cart -> CartItem uses orphanRemoval = true, so Hibernate
         * will delete the CartItem from the database automatically.
         *
         * This keeps the in-memory Cart collection consistent and
         * prevents Hibernate from trying to merge an already-deleted
         * CartItem.
         */
        cart.getCartItems().removeIf(
                item -> item.getId().equals(cartItemId)
        );

        cart.setUpdatedAt(
                OffsetDateTime.now()
        );

        cartRepository.save(
                cart
        );
    }


    @Override
    public void clearCart() {

        Cart cart =
                getOrCreateCart();

        /*
         * Do NOT use cartItemRepository.deleteByCart_Id().
         *
         * The Cart may already have its CartItem collection loaded
         * inside the same transaction (checkout does exactly this).
         *
         * Clearing the managed collection allows orphanRemoval = true
         * to delete the CartItems while keeping the Cart's in-memory
         * state consistent with the database.
         */
        cart.getCartItems().clear();

        cart.setUpdatedAt(
                OffsetDateTime.now()
        );

        cartRepository.save(
                cart
        );
    }


    @Override
    public Cart getCurrentCart() {

        return getOrCreateCart();
    }
}