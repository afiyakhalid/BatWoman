
package com.BatWoman.BatWoman_backend.service.shipping.impl;

import com.BatWoman.BatWoman_backend.config.ShiprocketConfig;
import com.BatWoman.BatWoman_backend.service.shipping.ShiprocketAuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Instant;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShiprocketAuthenticationServiceImpl
        implements ShiprocketAuthenticationService {

    private final RestClient shiprocketRestClient;
    private final ShiprocketConfig properties;

    private String accessToken;
    private Instant tokenExpiresAt;

    @Override
    public synchronized String getAccessToken() {

        if (accessToken != null
                && tokenExpiresAt != null
                && Instant.now().isBefore(tokenExpiresAt)) {

            return accessToken;
        }

        return authenticate();
    }

    private String authenticate() {

        Map<String, String> request = Map.of(
                "email", properties.getEmail(),
                "password", properties.getPassword()
        );

        Map<?, ?> response = shiprocketRestClient
                .post()
                .uri("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(Map.class);

        if (response == null || response.get("token") == null) {
            throw new IllegalStateException(
                    "Shiprocket authentication failed."
            );
        }

        accessToken = response.get("token").toString();

        /*
         * Shiprocket states that the token is valid for 240 hours.
         *
         * We intentionally refresh slightly early rather than
         * waiting until the exact expiration boundary.
         */
        tokenExpiresAt = Instant.now()
                .plusSeconds(240L * 60L * 60L - 300L);

        log.info("Successfully authenticated with Shiprocket.");

        return accessToken;
    }
}
