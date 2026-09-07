package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.wishlist.WishlistResponse;
import com.BatWoman.BatWoman_backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<WishlistResponse>> getMyWishlist() {

        return ResponseEntity.ok(
                wishlistService.getMyWishlist()
        );
    }

    @PostMapping("/{productId}")
    public ResponseEntity<WishlistResponse> addToWishlist(
            @PathVariable UUID productId) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(wishlistService.addToWishlist(productId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromWishlist(
            @PathVariable UUID productId) {

        wishlistService.removeFromWishlist(productId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{productId}/exists")
    public ResponseEntity<Boolean> isInWishlist(
            @PathVariable UUID productId) {

        return ResponseEntity.ok(
                wishlistService.isInWishlist(productId)
        );
    }
}