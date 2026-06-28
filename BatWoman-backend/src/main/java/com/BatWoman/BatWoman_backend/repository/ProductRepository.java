package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    Optional<Product> findBySlug(String slug);

    Optional<Product> findBySku(String sku);

    boolean existsBySku(String sku);

    Page<Product> findByActiveTrue(Pageable pageable);

    Page<Product> findByCategory_Id(UUID categoryId, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCase(String keyword,
                                                 Pageable pageable);

    List<Product> findTop10ByFeaturedTrue();

    List<Product> findTop10ByNewArrivalTrue();

    List<Product> findByPriceBetween(BigDecimal minPrice,
                                     BigDecimal maxPrice);

}
