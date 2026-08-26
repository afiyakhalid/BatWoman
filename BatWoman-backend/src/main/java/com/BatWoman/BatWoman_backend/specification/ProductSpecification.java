package com.BatWoman.BatWoman_backend.specification;

import com.BatWoman.BatWoman_backend.dto.product.ProductSearchRequest;
import com.BatWoman.BatWoman_backend.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.UUID;

public final class ProductSpecification {

    private ProductSpecification() {
    }

    public static Specification<Product> hasCategory(
            UUID categoryId
    ) {

        return (root, query, cb) ->
                categoryId == null
                        ? null
                        : cb.equal(
                        root.get("category").get("id"),
                        categoryId
                );
    }

    public static Specification<Product> hasKeyword(
            String keyword
    ) {

        return (root, query, cb) ->
                keyword == null || keyword.isBlank()
                        ? null
                        : cb.like(
                        cb.lower(root.get("name")),
                        "%" +
                                keyword
                                        .toLowerCase()
                                        .trim() +
                        "%"
                );
    }

    public static Specification<Product> priceGreaterThanOrEqualTo(
            BigDecimal minPrice
    ) {

        return (root, query, cb) ->
                minPrice == null
                        ? null
                        : cb.greaterThanOrEqualTo(
                        root.get("price"),
                        minPrice
                );
    }

    public static Specification<Product> priceLessThanOrEqualTo(
            BigDecimal maxPrice
    ) {

        return (root, query, cb) ->
                maxPrice == null
                        ? null
                        : cb.lessThanOrEqualTo(
                        root.get("price"),
                        maxPrice
                );
    }

    public static Specification<Product> hasFabric(
            String fabric
    ) {

        return (root, query, cb) ->
                fabric == null || fabric.isBlank()
                        ? null
                        : cb.equal(
                        cb.lower(root.get("fabric")),
                        fabric.toLowerCase().trim()
                );
    }

    public static Specification<Product> hasColor(
            String color
    ) {

        return (root, query, cb) ->
                color == null || color.isBlank()
                        ? null
                        : cb.equal(
                        cb.lower(root.get("color")),
                        color.toLowerCase().trim()
                );
    }

    public static Specification<Product> isActive() {

        return (root, query, cb) ->
                cb.isTrue(root.get("active"));
    }

    public static Specification<Product> build(
            ProductSearchRequest request
    ) {

        return Specification
                .where(
                        hasCategory(
                                request.categoryId()
                        )
                )
                .and(
                        hasKeyword(
                                request.keyword()
                        )
                )
                .and(
                        priceGreaterThanOrEqualTo(
                                request.minPrice()
                        )
                )
                .and(
                        priceLessThanOrEqualTo(
                                request.maxPrice()
                        )
                )
                .and(
                        hasFabric(
                                request.fabric()
                        )
                )
                .and(
                        hasColor(
                                request.color()
                        )
                )
                .and(
                        isActive()
                );
    }
}