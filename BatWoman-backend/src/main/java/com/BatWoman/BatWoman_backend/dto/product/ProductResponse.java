package com.BatWoman.BatWoman_backend.dto.product;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductResponse(

        UUID id,

        String name,

        String slug,

        String description,

        String fabric,

        String color,

        String size,

        BigDecimal price,

        BigDecimal discountPrice,

        Boolean featured,

        Boolean newArrival,

        Boolean active

) {
}
