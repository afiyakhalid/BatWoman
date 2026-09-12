package com.BatWoman.BatWoman_backend.dto.color;

import jakarta.validation.constraints.Size;

public record UpdateColorRequest(

        @Size(max = 100)
        String name,

        @Size(max = 50)
        String code,

        @Size(max = 7)
        String hexCode,

        Integer displayOrder,

        Boolean active

) {
}