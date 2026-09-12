package com.BatWoman.BatWoman_backend.dto.size;

import java.util.UUID;

public record SizeResponse(
        UUID id,
        String label,
        Integer numericValue
) {}