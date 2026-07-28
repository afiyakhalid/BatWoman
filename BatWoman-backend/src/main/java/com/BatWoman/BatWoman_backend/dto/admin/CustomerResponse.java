package com.BatWoman.BatWoman_backend.dto.admin;

import com.BatWoman.BatWoman_backend.enums.Role;

import java.time.OffsetDateTime;
import java.util.UUID;

public record CustomerResponse(

        UUID customerId,

        String firstName,

        String lastName,

        String email,

        String phone,

        Role role,

        Boolean verified,

        Boolean active,

        Integer totalOrders,

        OffsetDateTime createdAt

) {
}
