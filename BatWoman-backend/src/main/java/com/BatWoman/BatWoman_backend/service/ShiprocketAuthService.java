package com.BatWoman.BatWoman_backend.service.shipping;

import com.BatWoman.BatWoman_backend.config.ShiprocketConfig;
import com.BatWoman.BatWoman_backend.dto.shipping.shiprocket.ShiprocketAuthRequest;
import com.BatWoman.BatWoman_backend.dto.shipping.shiprocket.ShiprocketAuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ShiprocketAuthService {

    private static final Duration TOKEN_LIFETIME =
            Duration.ofHours(230);

    private final ShiprocketConfig shiprocketConfig;

    private volatile CachedToken cachedToken;

    public String getAccessToken() {

        CachedToken currentToken = cachedToken;

        if (currentToken != null
                && Instant.now().isBefore(currentToken.expiresAt())) {
            return currentToken.token();
        }

        synchronized (this) {

            currentToken = cachedToken;

            if (currentToken != null
                    && Instant.now().isBefore(currentToken.expiresAt())) {
                return currentToken.token();
            }

            return authenticate();
        }
    }

    private String authenticate() {

        RestClient restClient = RestClient.builder()
                .baseUrl(shiprocketConfig.getBaseUrl())
                .build();

        ShiprocketAuthRequest request =
                new ShiprocketAuthRequest(
                        shiprocketConfig.getEmail(),
                        shiprocketConfig.getPassword()
                );

        try {

            ShiprocketAuthResponse response =
                    restClient.post()
                            .uri("/v1/external/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(request)
                            .retrieve()
                            .body(ShiprocketAuthResponse.class);

            if (response == null
                    || response.token() == null
                    || response.token().isBlank()) {

                throw new IllegalStateException(
                        "Shiprocket authentication returned no access token."
                );
            }

            CachedToken newToken =
                    new CachedToken(
                            response.token(),
                            Instant.now().plus(TOKEN_LIFETIME)
                    );

            cachedToken = newToken;

            return newToken.token();

        } catch (RestClientResponseException exception) {

            throw new IllegalStateException(
                    "Shiprocket authentication failed with HTTP status "
                            + exception.getStatusCode().value() + ".",
                    exception
            );
        }
    }

    private record CachedToken(
            String token,
            Instant expiresAt
    ) {
    }
}