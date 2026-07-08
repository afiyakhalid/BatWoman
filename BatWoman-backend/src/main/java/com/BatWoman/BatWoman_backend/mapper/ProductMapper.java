package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.product.CreateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.UpdateProductRequest;
import com.BatWoman.BatWoman_backend.dto.product.ProductCardResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductDetailResponse;
import com.BatWoman.BatWoman_backend.dto.product.ProductResponse;
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

    @Mapping(target = "thumbnail", expression = "java(getThumbnail(product))")
    ProductCardResponse toCardResponse(Product product);

    ProductDetailResponse toDetailResponse(Product product);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProductFromDto(
            UpdateProductRequest request,
            @MappingTarget Product product
    );

    default String getThumbnail(Product product) {

        return product.getImages()
                .stream()
                .filter(image -> Boolean.TRUE.equals(image.getPrimary()))
                .findFirst()
                .map(ProductImage::getObjectKey)
                .orElse(null);
    }
}