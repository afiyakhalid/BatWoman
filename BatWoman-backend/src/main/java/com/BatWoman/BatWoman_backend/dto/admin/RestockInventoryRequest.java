package com.BatWoman.BatWoman_backend.dto.admin;

import java.util.UUID;
public record RestockInventoryRequest(

        UUID productId,

        Integer quantity

) {
}