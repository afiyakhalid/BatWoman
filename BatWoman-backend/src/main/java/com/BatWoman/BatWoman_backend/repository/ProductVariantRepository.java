package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductVariantRepository
        extends JpaRepository<ProductVariant, UUID> {

    List<ProductVariant> findByProduct_Id(
            UUID productId
    );

    List<ProductVariant> findByProduct_IdAndActiveTrue(
            UUID productId
    );

    Optional<ProductVariant> findBySku(
            String sku
    );

    boolean existsBySku(
            String sku
    );

    boolean existsByProduct_IdAndSize_IdAndColor_Id(
            UUID productId,
            UUID sizeId,
            UUID colorId
    );

    boolean existsByColor_Id(
            UUID colorId
    );
}