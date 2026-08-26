package com.BatWoman.BatWoman_backend.dto.product;

import com.BatWoman.BatWoman_backend.enums.MediaType;

import java.util.UUID;

public record ProductMediaResponse(

        UUID id,

        MediaType mediaType,

        String mediaUrl,

        String objectKey,

        String altText,

        Boolean primaryMedia,

        Integer displayOrder

) {
}