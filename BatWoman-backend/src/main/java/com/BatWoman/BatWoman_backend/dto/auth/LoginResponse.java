package com.BatWoman.BatWoman_backend.dto.auth;

import com.BatWoman.BatWoman_backend.enums.Role;

public record LoginResponse(

        String accessToken,

        String refreshToken,

        Long expiresIn,

        Role role

) {
}