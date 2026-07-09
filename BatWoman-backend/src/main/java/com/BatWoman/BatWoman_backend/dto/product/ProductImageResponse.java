package com.BatWoman.BatWoman_backend.dto.product;

public record ProductImageResponse(
        String objectKey,
        String altText,
        Boolean primary
) {}
