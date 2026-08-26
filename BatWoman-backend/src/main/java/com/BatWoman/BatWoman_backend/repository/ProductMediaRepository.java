package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductMediaRepository
        extends JpaRepository<ProductMedia, UUID> {

    /**
     * Returns all media belonging to a product ordered by display order.
     */
    List<ProductMedia> findByProductOrderByDisplayOrderAsc(Product product);

    /**
     * Returns all media belonging to a product.
     */
    List<ProductMedia> findByProduct(Product product);

    /**
     * Returns the primary media of a product.
     */
    Optional<ProductMedia> findByProductAndPrimaryMediaTrue(Product product);

    /**
     * Counts media files belonging to a product.
     */
    long countByProduct(Product product);

    /**
     * Deletes all media belonging to a product.
     */
    void deleteByProduct(Product product);
}