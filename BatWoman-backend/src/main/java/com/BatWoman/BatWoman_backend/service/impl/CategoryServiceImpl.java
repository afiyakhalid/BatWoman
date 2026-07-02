package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.category.CreateCategoryRequest;
import com.BatWoman.BatWoman_backend.dto.category.UpdateCategoryRequest;
import com.BatWoman.BatWoman_backend.dto.category.CategoryResponse;
import com.BatWoman.BatWoman_backend.entity.Category;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.mapper.CategoryMapper;
import com.BatWoman.BatWoman_backend.repository.CategoryRepository;
import com.BatWoman.BatWoman_backend.service.CategoryService;
import com.BatWoman.BatWoman_backend.util.SlugUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponse createCategory(CreateCategoryRequest request) {

        if (categoryRepository.existsByName(request.name())) {
            throw new ValidationException("Category name already exists.");
        }

        String slug = SlugUtil.toSlug(request.name());

        if (categoryRepository.existsBySlug(slug)) {
            throw new ValidationException("Category slug already exists.");
        }
        Category category = categoryMapper.toEntity(request);

        category.setId(UUID.randomUUID());
        category.setSlug(slug);

        category.setDisplayOrder(0);
        category.setActive(true);

        category.setCreatedAt(OffsetDateTime.now());
        category.setUpdatedAt(OffsetDateTime.now());

        Category savedCategory = categoryRepository.save(category);

        return categoryMapper.toResponse(savedCategory);
    }

    @Override
    public CategoryResponse updateCategory(
            UUID categoryId,
            UpdateCategoryRequest request) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        categoryMapper.updateCategoryFromDto(request, category);

        category.setUpdatedAt(OffsetDateTime.now());

        Category updatedCategory = categoryRepository.save(category);

        return categoryMapper.toResponse(updatedCategory);
    }

    @Override
    public void deleteCategory(UUID categoryId) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        categoryRepository.delete(category);
    }

    @Override
    public CategoryResponse getCategoryById(UUID categoryId) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        return categoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse getCategoryBySlug(String slug) {

        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        return categoryMapper.toResponse(category);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findByActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }

}