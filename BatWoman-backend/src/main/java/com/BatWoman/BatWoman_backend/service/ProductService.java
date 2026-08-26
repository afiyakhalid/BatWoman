package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.product.CreateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductSearchRequest;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductRequest;
import org.springframework.data.domain.Page;
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

    Page<ProductCardResponse> searchProducts(ProductSearchRequest request);

    ProductDetailResponse getProductById(UUID productId);

    ProductDetailResponse getProductBySlug(String slug);

    List<ProductCardResponse> getAllProducts();

    List<ProductCardResponse> getFeaturedProducts();

    List<ProductCardResponse> getNewArrivals();


    void uploadProductFiles(
            UUID productId,
            List<MultipartFile> files
    );
    void deleteProductMedia(
            UUID productId,
            UUID mediaId
    );

    void setPrimaryProductMedia(
            UUID productId,
            UUID mediaId
    );
    void reorderProductMedia(
            UUID productId,
            List<UUID> mediaIds
    );
    void replaceProductMedia(
            UUID productId,
            UUID mediaId,
            MultipartFile file
    );

}