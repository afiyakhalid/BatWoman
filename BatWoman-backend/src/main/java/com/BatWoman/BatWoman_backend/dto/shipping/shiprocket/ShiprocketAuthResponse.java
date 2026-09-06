package com.BatWoman.BatWoman_backend.dto.shipping.shiprocket;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ShiprocketAuthResponse(
        String token
) {
}