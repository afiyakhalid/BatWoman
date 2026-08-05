package com.BatWoman.BatWoman_backend.dto.admin;

import java.time.OffsetDateTime;
import java.util.UUID;

public record AdminReviewResponse(

        UUID reviewId,

        UUID productId,

        String productName,

        UUID userId,

        String customerName,

        Integer rating,

        String title,

        String comment,

        String status,

        OffsetDateTime createdAt

) {
}