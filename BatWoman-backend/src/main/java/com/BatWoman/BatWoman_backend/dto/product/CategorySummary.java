package com.BatWoman.BatWoman_backend.dto.product;

import java.util.UUID;

public record CategorySummary(
        UUID id,
        String name,
        String slug
) {}
