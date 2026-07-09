package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.product.*;
import com.BatWoman.BatWoman_backend.entity.Category;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.ProductImage;
import org.mapstruct.*;

//@Mapper(componentModel = "spring")
//public interface ProductMapper {
//
//    Product toEntity(CreateProductRequest request);
//
//    ProductResponse toResponse(Product product);
//
//    ProductCardResponse toCardResponse(Product product);
//
//    ProductDetailResponse toDetailResponse(Product product);
//
//    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//    void updateProductFromDto(
//            UpdateProductRequest request,
//            @MappingTarget Product product
//    );
//    default String map(ProductImage image) {
//        return image.getObjectKey();
//    }
//}
@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(CreateProductRequest request);

    ProductResponse toResponse(Product product);

    ProductCardResponse toCardResponse(Product product);

    ProductDetailResponse toDetailResponse(Product product);

    CategorySummary toCategorySummary(Category category);

    ProductImageResponse toProductImageResponse(ProductImage image);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductFromDto(
            UpdateProductRequest request,
            @MappingTarget Product product
    );
}