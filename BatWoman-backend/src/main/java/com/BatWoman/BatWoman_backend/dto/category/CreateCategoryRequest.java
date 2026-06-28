package com.BatWoman.BatWoman_backend.dto.category;

import jakarta.validation.constraints.NotBlank;

public record CreateCategoryRequest(

        @NotBlank
        String name,

        String description,

        Integer displayOrder

) {
}
