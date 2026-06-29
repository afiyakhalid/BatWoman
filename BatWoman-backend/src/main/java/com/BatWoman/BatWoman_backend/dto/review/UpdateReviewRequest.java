package com.BatWoman.BatWoman_backend.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateReviewRequest(

        @NotNull
        @Min(1)
        @Max(5)
        Integer rating,

        String title,

        String comment

) {
}