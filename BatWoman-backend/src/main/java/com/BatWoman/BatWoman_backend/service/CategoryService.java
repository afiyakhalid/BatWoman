package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.category.CreateCategoryRequest;
import com.BatWoman.BatWoman_backend.dto.category.UpdateCategoryRequest;
import com.BatWoman.BatWoman_backend.dto.category.CategoryResponse;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    CategoryResponse createCategory(CreateCategoryRequest request);

    CategoryResponse updateCategory(
            UUID categoryId,
            UpdateCategoryRequest request
    );

    void deleteCategory(UUID categoryId);

    CategoryResponse getCategoryById(UUID categoryId);

    CategoryResponse getCategoryBySlug(String slug);

    List<CategoryResponse> getAllCategories();

}