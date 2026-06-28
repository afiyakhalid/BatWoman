package com.BatWoman.BatWoman_backend.dto.common;

import lombok.Builder;

@Builder
public record ApiResponse<T>(
        boolean success,
        String message,
        T data
) {
}
