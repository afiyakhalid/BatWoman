package com.BatWoman.BatWoman_backend.dto.color;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ColorResponse(

        UUID id,

        String name,

        String code,

        String hexCode,

        Boolean active,

        Integer displayOrder,

        OffsetDateTime createdAt,

        OffsetDateTime updatedAt

) {
}