package com.BatWoman.BatWoman_backend.dto.admin;

public record PaymentStatusAnalyticsResponse(

        Long pending,

        Long successful,

        Long failed

) {
}
