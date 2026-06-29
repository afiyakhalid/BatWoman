package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.product.CreateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductSearchRequest;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductDetailResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    ProductResponse createProduct(CreateProductRequest request);

    ProductResponse updateProduct(
            UUID productId,
            UpdateProductRequest request
    );

    void deleteProduct(UUID productId);

    ProductDetailResponse getProductById(UUID productId);

    ProductDetailResponse getProductBySlug(String slug);

    List<ProductCardResponse> getAllProducts();

    List<ProductCardResponse> getFeaturedProducts();

    List<ProductCardResponse> getNewArrivals();

    List<ProductCardResponse> searchProducts(
            ProductSearchRequest request
    );

    void uploadProductImages(
            UUID productId,
            List<MultipartFile> images
    );

}