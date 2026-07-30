package com.BatWoman.BatWoman_backend.dto.admin.settings;

import com.BatWoman.BatWoman_backend.enums.Role;

import java.util.UUID;

public record AdminProfileResponse(

        UUID id,

        String firstName,

        String lastName,

        String email,

        String phoneNumber,

        Role role

) {}
