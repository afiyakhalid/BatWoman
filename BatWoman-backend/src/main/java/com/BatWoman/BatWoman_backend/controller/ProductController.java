package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.product.CreateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductDetailResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductSearchRequest;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductRequest;
import com.BatWoman.BatWoman_backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody CreateProductRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(request));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable UUID productId,
            @Valid @RequestBody UpdateProductRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(productId, request)
        );
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable UUID productId) {

        productService.deleteProduct(productId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDetailResponse> getProductById(
            @PathVariable UUID productId) {

        return ResponseEntity.ok(
                productService.getProductById(productId)
        );
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductDetailResponse> getProductBySlug(
            @PathVariable String slug) {

        return ResponseEntity.ok(
                productService.getProductBySlug(slug)
        );
    }

    @GetMapping
    public ResponseEntity<List<ProductCardResponse>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts()
        );
    }

    @GetMapping("/featured")
    public ResponseEntity<List<ProductCardResponse>> getFeaturedProducts() {

        return ResponseEntity.ok(
                productService.getFeaturedProducts()
        );
    }

    @GetMapping("/new-arrivals")
    public ResponseEntity<List<ProductCardResponse>> getNewArrivals() {

        return ResponseEntity.ok(
                productService.getNewArrivals()
        );
    }

    @PostMapping("/search")
    public ResponseEntity<List<ProductCardResponse>> searchProducts(
            @RequestBody ProductSearchRequest request) {

        return ResponseEntity.ok(
                productService.searchProducts(request)
        );
    }

    @PostMapping("/{productId}/images")
    public ResponseEntity<Void> uploadImages(
            @PathVariable UUID productId,
            @RequestParam("images") List<MultipartFile> images) {

        productService.uploadProductImages(productId, images);

        return ResponseEntity.ok().build();
    }
}
