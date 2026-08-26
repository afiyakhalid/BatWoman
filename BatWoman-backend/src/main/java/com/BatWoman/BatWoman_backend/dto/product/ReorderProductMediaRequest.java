package com.BatWoman.BatWoman_backend.dto.product;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.UUID;

public record ReorderProductMediaRequest(

        @NotEmpty
        List<UUID> mediaIds

) {
}