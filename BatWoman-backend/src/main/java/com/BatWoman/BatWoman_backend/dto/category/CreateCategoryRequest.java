package com.BatWoman.BatWoman_backend.dto.category;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record CreateCategoryRequest(

        @NotBlank
        String name,

        String description,

        Integer displayOrder,
        UUID parentCategoryId

) {
}
