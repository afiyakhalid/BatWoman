package com.BatWoman.BatWoman_backend.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateReviewRequest(

        @NotNull
        UUID productId,

        @NotNull
        @Min(1)
        @Max(5)
        Integer rating,

        @NotBlank
        String title,

        @NotBlank
        String comment

) {
}
