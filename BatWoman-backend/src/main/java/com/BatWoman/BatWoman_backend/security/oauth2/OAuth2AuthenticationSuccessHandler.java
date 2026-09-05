package com.BatWoman.BatWoman_backend.security.oauth2;

import com.BatWoman.BatWoman_backend.dto.auth.LoginResponse;
import com.BatWoman.BatWoman_backend.entity.RefreshToken;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.repository.RefreshTokenRepository;
import com.BatWoman.BatWoman_backend.repository.UserRepository;
import com.BatWoman.BatWoman_backend.security.JwtService;
import com.BatWoman.BatWoman_backend.security.UserPrincipal;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler
        implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oauth2User =
                (OAuth2User) authentication.getPrincipal();

        String email =
                oauth2User.getAttribute("email");

        if (email == null || email.isBlank()) {
            throw new ResourceNotFoundException(
                    "Google account email not found."
            );
        }

        System.out.println(
                "OAuth2 success handler looking up user: " + email
        );

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found for Google email: " + email
                        )
                );

        UserPrincipal userPrincipal =
                new UserPrincipal(user);

        String accessToken =
                jwtService.generateToken(userPrincipal);

        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByUser(user)
                        .orElse(
                                RefreshToken.builder()
                                        .id(UUID.randomUUID())
                                        .user(user)
                                        .createdAt(OffsetDateTime.now())
                                        .build()
                        );

        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken.setExpiresAt(
                OffsetDateTime.now().plusDays(30)
        );

        refreshToken.setRevoked(false);

        refreshTokenRepository.save(refreshToken);

        user.setLastLogin(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());

        userRepository.save(user);

        LoginResponse loginResponse =
                new LoginResponse(
                        accessToken,
                        refreshToken.getToken(),
                        jwtService.getExpirationTime(),
                        user.getRole()
                );

        String redirectUrl =
                "http://localhost:3001/auth/callback"
                        + "?accessToken=" + loginResponse.accessToken()
                        + "&refreshToken=" + loginResponse.refreshToken()
                        + "&expiresIn=" + loginResponse.expiresIn()
                        + "&role=" + loginResponse.role();

        response.sendRedirect(redirectUrl);
    }
}