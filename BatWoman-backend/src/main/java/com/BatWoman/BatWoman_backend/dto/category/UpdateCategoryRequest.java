package com.BatWoman.BatWoman_backend.dto.category;

public record UpdateCategoryRequest(

        String name,

        String description,

        Integer displayOrder,

        Boolean active

) {
}