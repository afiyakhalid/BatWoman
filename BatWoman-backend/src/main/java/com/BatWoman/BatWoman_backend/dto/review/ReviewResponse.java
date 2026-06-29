package com.BatWoman.BatWoman_backend.dto.review;

import java.time.OffsetDateTime;
import java.util.UUID;

public record ReviewResponse(

        UUID id,

        UUID productId,

        UUID userId,

        String userName,

        Integer rating,

        String title,

        String comment,

        Boolean verifiedPurchase,

        String status,

        OffsetDateTime createdAt

) {
}