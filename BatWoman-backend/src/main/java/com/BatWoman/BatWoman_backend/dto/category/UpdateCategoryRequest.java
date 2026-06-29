package com.BatWoman.BatWoman_backend.dto.category;

import java.util.UUID;

public record UpdateCategoryRequest(

        String name,

        String description,

        Integer displayOrder,

        Boolean active,
        UUID parentCategoryId

) {
}