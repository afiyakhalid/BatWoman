package com.BatWoman.BatWoman_backend.dto.admin;

public record OrderStatusAnalyticsResponse(

        Long pending,

        Long paid,

        Long shipped,

        Long delivered,

        Long cancelled

) {
}