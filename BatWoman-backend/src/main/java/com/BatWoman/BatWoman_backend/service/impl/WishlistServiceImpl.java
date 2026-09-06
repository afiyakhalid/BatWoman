package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.wishlist.WishlistResponse;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductMedia;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.entity.Wishlist;
import com.BatWoman.BatWoman_backend.repository.ProductRepository;
import com.BatWoman.BatWoman_backend.repository.UserRepository;
import com.BatWoman.BatWoman_backend.repository.WishlistRepository;
import com.BatWoman.BatWoman_backend.repository.WishlistRepository;
import com.BatWoman.BatWoman_backend.security.UserPrincipal;
import com.BatWoman.BatWoman_backend.service.WishlistService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<WishlistResponse> getMyWishlist() {

        User user = getAuthenticatedUser();

        return wishlistRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public WishlistResponse addToWishlist(UUID productId) {

        User user = getAuthenticatedUser();

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Product not found."));

        if (wishlistRepository.existsByUser_IdAndProduct_Id(
                user.getId(),
                productId)) {

            throw new IllegalStateException(
                    "Product is already in your wishlist.");
        }

        Wishlist wishlist = Wishlist.builder()
                .id(UUID.randomUUID())
                .user(user)
                .product(product)
                .createdAt(OffsetDateTime.now())
                .build();

        Wishlist savedWishlist = wishlistRepository.save(wishlist);

        return toResponse(savedWishlist);
    }

    @Override
    public void removeFromWishlist(UUID productId) {

        User user = getAuthenticatedUser();

        Wishlist wishlist = wishlistRepository
                .findByUser_IdAndProduct_Id(
                        user.getId(),
                        productId)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Product is not in your wishlist."));

        wishlistRepository.delete(wishlist);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isInWishlist(UUID productId) {

        User user = getAuthenticatedUser();

        return wishlistRepository.existsByUser_IdAndProduct_Id(
                user.getId(),
                productId);
    }

    private WishlistResponse toResponse(Wishlist wishlist) {

        Product product = wishlist.getProduct();

        List<WishlistResponse.ProductMediaResponse> media =
                product.getMedia()
                        .stream()
                        .map(this::toMediaResponse)
                        .toList();

        return WishlistResponse.builder()
                .id(wishlist.getId())
                .createdAt(wishlist.getCreatedAt())
                .product(
                        WishlistResponse.ProductWishlistResponse.builder()
                                .id(product.getId())
                                .name(product.getName())
                                .slug(product.getSlug())
                                .price(product.getPrice())
                                .discountPrice(product.getDiscountPrice())
                                .active(product.getActive())
                                .featured(product.getFeatured())
                                .newArrival(product.getNewArrival())
                                .media(media)
                                .build()
                )
                .build();
    }

    private WishlistResponse.ProductMediaResponse toMediaResponse(
            ProductMedia media) {

        return WishlistResponse.ProductMediaResponse.builder()
                .id(media.getId())

                .primaryMedia(media.getPrimaryMedia())
                .build();
    }

    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()) {

            throw new IllegalStateException(
                    "User is not authenticated.");
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof UserPrincipal userPrincipal)) {

            throw new IllegalStateException(
                    "Authenticated principal is not a UserPrincipal.");
        }

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Authenticated user not found."));
    }
}