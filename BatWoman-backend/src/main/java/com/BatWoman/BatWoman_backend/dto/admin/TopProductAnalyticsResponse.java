package com.BatWoman.BatWoman_backend.dto.admin;

import java.util.UUID;

public record TopProductAnalyticsResponse(

        UUID productId,

        String productName,

        Long unitsSold

) {
}