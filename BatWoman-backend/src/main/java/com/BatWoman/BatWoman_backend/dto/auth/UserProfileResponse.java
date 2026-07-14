package com.BatWoman.BatWoman_backend.dto.auth;

import java.util.UUID;

public record UserProfileResponse(

        UUID id,

        String firstName,

        String lastName,

        String email,

        String phone,

        String role

) {}
