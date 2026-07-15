package com.BatWoman.BatWoman_backend.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CheckoutRequest(



        UUID addressId





) {
}
