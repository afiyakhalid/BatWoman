package com.BatWoman.BatWoman_backend.dto.auth;

public record LoginResponse(

        String accessToken,

        String refreshToken,

        Long expiresIn

) {
}
