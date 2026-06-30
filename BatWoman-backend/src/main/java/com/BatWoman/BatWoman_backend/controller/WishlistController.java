package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<ProductCardResponse>> getWishlist() {

        return ResponseEntity.ok(
                wishlistService.getWishlist()
        );
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Void> addProduct(

            @PathVariable UUID productId) {

        wishlistService.addProduct(productId);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeProduct(

            @PathVariable UUID productId) {

        wishlistService.removeProduct(productId);

        return ResponseEntity.noContent().build();
    }
}