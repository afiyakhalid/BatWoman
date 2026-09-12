package com.BatWoman.BatWoman_backend.specification;

import com.BatWoman.BatWoman_backend.dto.product.ProductSearchRequest;
import com.BatWoman.BatWoman_backend.entity.Color;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductVariant;
import com.BatWoman.BatWoman_backend.entity.Size;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public final class ProductSpecification {

    private ProductSpecification() {
    }

    public static Specification<Product> build(
            ProductSearchRequest request) {

        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates =
                    new ArrayList<>();

            /*
             * A product can have multiple variants.
             *
             * Color and size filters must be applied to the
             * SAME ProductVariant.
             *
             * Example:
             *
             * Product
             *   ├── Black / L
             *   └── White / M
             *
             * Searching:
             *
             * color = Black
             * size  = M
             *
             * must NOT match this product.
             *
             * Therefore, when variant filters are present,
             * we use one ProductVariant join and apply all
             * variant predicates to that same join.
             */
            query.distinct(true);

            // ====================================================
            // Active Product
            // ====================================================

            predicates.add(
                    criteriaBuilder.equal(
                            root.get("active"),
                            true
                    )
            );

            // ====================================================
            // Keyword
            // ====================================================

            if (
                    request.keyword() != null
                            &&
                            !request.keyword().isBlank()
            ) {

                String keyword =
                        "%" +
                                request.keyword()
                                        .trim()
                                        .toLowerCase() +
                                "%";

                Predicate namePredicate =
                        criteriaBuilder.like(
                                criteriaBuilder.lower(
                                        root.get("name")
                                ),
                                keyword
                        );

                Predicate descriptionPredicate =
                        criteriaBuilder.like(
                                criteriaBuilder.lower(
                                        root.get("description")
                                ),
                                keyword
                        );

                Predicate fabricPredicate =
                        criteriaBuilder.like(
                                criteriaBuilder.lower(
                                        root.get("fabric")
                                ),
                                keyword
                        );

                predicates.add(
                        criteriaBuilder.or(
                                namePredicate,
                                descriptionPredicate,
                                fabricPredicate
                        )
                );
            }

            // ====================================================
            // Category
            // ====================================================

            if (request.categoryId() != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("category").get("id"),
                                request.categoryId()
                        )
                );
            }

            // ====================================================
            // Price
            // ====================================================

            if (request.minPrice() != null) {

                predicates.add(
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("price"),
                                request.minPrice()
                        )
                );
            }

            if (request.maxPrice() != null) {

                predicates.add(
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("price"),
                                request.maxPrice()
                        )
                );
            }

            // ====================================================
            // Fabric
            // ====================================================

            if (
                    request.fabric() != null
                            &&
                            !request.fabric().isBlank()
            ) {

                predicates.add(
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(
                                        root.get("fabric")
                                ),
                                request.fabric()
                                        .trim()
                                        .toLowerCase()
                        )
                );
            }

            // ====================================================
            // Variant Filters
            // ====================================================

            /*
             * IMPORTANT:
             *
             * Create ONE variant join.
             *
             * Both color and size predicates are applied to
             * this same ProductVariant.
             *
             * This guarantees:
             *
             * color = Black
             * size  = M
             *
             * means:
             *
             * SAME VARIANT = Black / M
             */
            if (
                    request.colorId() != null
                            ||
                            request.sizeId() != null
            ) {

                Join<Product, ProductVariant> variantJoin =
                        root.join(
                                "variants",
                                JoinType.INNER
                        );

                // ------------------------------------------------
                // Variant Active
                // ------------------------------------------------

                predicates.add(
                        criteriaBuilder.equal(
                                variantJoin.get("active"),
                                true
                        )
                );

                // ------------------------------------------------
                // Color
                // ------------------------------------------------

                if (request.colorId() != null) {

                    Join<ProductVariant, Color> colorJoin =
                            variantJoin.join(
                                    "color",
                                    JoinType.INNER
                            );

                    predicates.add(
                            criteriaBuilder.equal(
                                    colorJoin.get("id"),
                                    request.colorId()
                            )
                    );
                }

                // ------------------------------------------------
                // Size
                // ------------------------------------------------

                if (request.sizeId() != null) {

                    Join<ProductVariant, Size> sizeJoin =
                            variantJoin.join(
                                    "size",
                                    JoinType.INNER
                            );

                    predicates.add(
                            criteriaBuilder.equal(
                                    sizeJoin.get("id"),
                                    request.sizeId()
                            )
                    );
                }
            }

            return criteriaBuilder.and(
                    predicates.toArray(
                            new Predicate[0]
                    )
            );
        };
    }
}