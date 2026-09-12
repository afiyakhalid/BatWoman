package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.product.CategorySummary;
import com.BatWoman.BatWoman_backend.dto.product.CreateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductDetailResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductMediaResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductResponse;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductRequest;
import com.BatWoman.BatWoman_backend.entity.Category;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductMedia;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "variants", ignore = true)
    @Mapping(target = "media", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "orderItems", ignore = true)
    @Mapping(target = "wishlists", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Product toEntity(CreateProductRequest request);

    @Mapping(target = "variants", ignore = true)
    ProductResponse toResponse(Product product);

    ProductCardResponse toCardResponse(Product product);

    @Mapping(target = "variants", ignore = true)
    @Mapping(target = "availableQuantity", ignore = true)
    @Mapping(target = "media", ignore = true)
    ProductDetailResponse toDetailResponse(Product product);

    CategorySummary toCategorySummary(Category category);

    @Mapping(target = "primaryMedia", source = "primaryMedia")
    ProductMediaResponse toProductMediaResponse(ProductMedia media);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "variants", ignore = true)
    @Mapping(target = "media", ignore = true)
    @Mapping(target = "reviews", ignore = true)
    @Mapping(target = "orderItems", ignore = true)
    @Mapping(target = "wishlists", ignore = true)
    @Mapping(target = "slug", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateProductFromDto(
            UpdateProductRequest request,
            @MappingTarget Product product
    );
}