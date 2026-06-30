package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.entity.Wishlist;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.mapper.ProductMapper;
import com.BatWoman.BatWoman_backend.repository.ProductRepository;
import com.BatWoman.BatWoman_backend.repository.WishListRepository;
import com.BatWoman.BatWoman_backend.service.AuthService;
import com.BatWoman.BatWoman_backend.service.WishlistService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class WishlistServiceImpl implements WishlistService {

    private final WishListRepository wishListRepository;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final AuthService authService;
    @Override
    public void addProduct(UUID productId) {

        User user = authService.getCurrentUser();

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        if (wishListRepository
                .findByUser_IdAndProduct_Id(user.getId(), productId)
                .isPresent()) {

            throw new ValidationException(
                    "Product already exists in wishlist.");
        }

        Wishlist wishlist = Wishlist.builder()
                .id(UUID.randomUUID())
                .user(user)
                .product(product)
                .createdAt(OffsetDateTime.now())
                .build();

        wishListRepository.save(wishlist);
    }
    @Override
    public void removeProduct(UUID productId) {

        User user = authService.getCurrentUser();

        Wishlist wishlist = wishListRepository
                .findByUser_IdAndProduct_Id(
                        user.getId(),
                        productId
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Wishlist item not found."));

        wishListRepository.delete(wishlist);
    }
    @Override
    public List<ProductCardResponse> getWishlist() {

        User user = authService.getCurrentUser();

        return wishListRepository.findByUser_Id(user.getId())
                .stream()
                .map(Wishlist::getProduct)
                .map(productMapper::toCardResponse)
                .toList();
    }
}