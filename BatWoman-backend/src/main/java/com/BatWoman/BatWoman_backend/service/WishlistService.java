package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.wishlist.WishlistResponse;

import java.util.List;
import java.util.UUID;

public interface WishlistService {

    List<WishlistResponse> getMyWishlist();

    WishlistResponse addToWishlist(UUID productId);

    void removeFromWishlist(UUID productId);

    boolean isInWishlist(UUID productId);
}