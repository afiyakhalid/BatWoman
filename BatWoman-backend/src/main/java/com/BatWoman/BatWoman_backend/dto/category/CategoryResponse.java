package com.BatWoman.BatWoman_backend.dto.category;

import java.util.UUID;

public record CategoryResponse(

        UUID id,

        String name,

        String slug,

        String description,

        String imageUrl,

        Integer displayOrder,

        Boolean active

) {
}
