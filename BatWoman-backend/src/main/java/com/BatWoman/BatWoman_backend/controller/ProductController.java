package com.BatWoman.BatWoman_backend.controller;
import com.BatWoman.BatWoman_backend.dto.product.ReorderProductMediaRequest;
import jakarta.validation.Valid;
import com.BatWoman.BatWoman_backend.dto.product.CreateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductDetailResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductSearchRequest;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductRequest;
import com.BatWoman.BatWoman_backend.service.ProductService;
import org.springframework.data.domain.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    @PatchMapping(
            value = "/{productId}/media/{mediaId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Void> replaceProductMedia(
            @PathVariable UUID productId,
            @PathVariable UUID mediaId,
            @RequestPart("file") MultipartFile file) {

        productService.replaceProductMedia(
                productId,
                mediaId,
                file
        );

        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{productId}/media/{mediaId}/primary")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void setPrimaryProductMedia(
            @PathVariable UUID productId,
            @PathVariable UUID mediaId) {

        productService.setPrimaryProductMedia(
                productId,
                mediaId
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<List<ProductCardResponse>> getAllProductsForAdmin() {

        return ResponseEntity.ok(
                productService.getAllProductsForAdmin()
        );
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

    @PatchMapping("/{productId}/media/reorder")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void reorderProductMedia(
            @PathVariable UUID productId,
            @Valid @RequestBody ReorderProductMediaRequest request) {

        productService.reorderProductMedia(
                productId,
                request.mediaIds()
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
    public ResponseEntity<Page<ProductCardResponse>> searchProducts(
            @RequestBody ProductSearchRequest request) {

        return ResponseEntity.ok(
                productService.searchProducts(request)
        );
    }

    @PostMapping(
            value = "/{productId}/media",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Void> uploadProductMedia(
            @PathVariable UUID productId,
            @RequestPart("files") List<MultipartFile> files) {

        System.out.println("========== UPLOAD CONTROLLER HIT ==========");
        System.out.println("Product ID: " + productId);
        System.out.println("Number of files: " + files.size());

        for (MultipartFile file : files) {
            System.out.println(
                    "FILE -> name=" + file.getOriginalFilename()
                            + ", contentType=" + file.getContentType()
                            + ", size=" + file.getSize()
                            + ", empty=" + file.isEmpty()
            );
        }

        productService.uploadProductFiles(productId, files);

        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{productId}/media/{mediaId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProductMedia(
            @PathVariable UUID productId,
            @PathVariable UUID mediaId) {

        productService.deleteProductMedia(
                productId,
                mediaId
        );
    }
}