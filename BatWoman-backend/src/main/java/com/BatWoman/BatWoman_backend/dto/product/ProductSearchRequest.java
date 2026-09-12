package com.BatWoman.BatWoman_backend.dto.product;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductSearchRequest(

        String keyword,

        UUID categoryId,

        BigDecimal minPrice,

        BigDecimal maxPrice,

        String fabric,

        UUID colorId,

        UUID sizeId,

        Integer page,

        Integer size,

        String sort

) {
}