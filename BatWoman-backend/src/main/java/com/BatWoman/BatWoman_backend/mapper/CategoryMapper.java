package com.BatWoman.BatWoman_backend.mapper;

import com.BatWoman.BatWoman_backend.dto.category.CreateCategoryRequest;
import com.BatWoman.BatWoman_backend.dto.category.UpdateCategoryRequest;
import com.BatWoman.BatWoman_backend.dto.category.CategoryResponse;
import com.BatWoman.BatWoman_backend.entity.Category;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category toEntity(CreateCategoryRequest request);

    CategoryResponse toResponse(Category category);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCategoryFromDto(
            UpdateCategoryRequest request,
            @MappingTarget Category category
    );
}
