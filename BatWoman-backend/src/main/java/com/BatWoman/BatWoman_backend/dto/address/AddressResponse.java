package com.BatWoman.BatWoman_backend.dto.address;

import java.util.UUID;

public record AddressResponse(

        UUID id,

        String fullName,

        String phone,

        String addressLine1,

        String addressLine2,

        String city,

        String state,

        String country,

        String postalCode,

        Boolean defaultAddress

) {
}
