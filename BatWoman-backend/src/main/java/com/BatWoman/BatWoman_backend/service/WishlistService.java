package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;

import java.util.List;
import java.util.UUID;

public interface WishlistService {

    void addProduct(UUID productId);

    void removeProduct(UUID productId);

    List<ProductCardResponse> getWishlist();

}
