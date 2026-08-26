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

    Product toEntity(CreateProductRequest request);

    ProductResponse toResponse(Product product);

    ProductCardResponse toCardResponse(Product product);

    ProductDetailResponse toDetailResponse(Product product);

    CategorySummary toCategorySummary(Category category);

    @Mapping(target = "primaryMedia", source = "primaryMedia")
    ProductMediaResponse toProductMediaResponse(ProductMedia media);

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    void updateProductFromDto(
            UpdateProductRequest request,
            @MappingTarget Product product
    );

}