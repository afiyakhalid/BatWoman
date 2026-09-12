package com.BatWoman.BatWoman_backend.dto.color;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateColorRequest(

        @NotBlank
        @Size(max = 100)
        String name,

        @NotBlank
        @Size(max = 50)
        String code,

        @Size(max = 7)
        String hexCode,

        Integer displayOrder

) {
}