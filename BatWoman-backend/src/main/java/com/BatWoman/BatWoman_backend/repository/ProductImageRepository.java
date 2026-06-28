package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductImageRepository
        extends JpaRepository<ProductImage, UUID> {

    List<ProductImage> findByProduct(Product product);

    List<ProductImage> findByProduct_Id(UUID productId);

    ProductImage findByProductAndPrimaryTrue(Product product);

}