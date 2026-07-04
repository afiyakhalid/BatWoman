package com.BatWoman.BatWoman_backend.service.impl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.BatWoman.BatWoman_backend.dto.auth.LoginRequest;
import com.BatWoman.BatWoman_backend.dto.auth.LoginResponse;
import com.BatWoman.BatWoman_backend.dto.auth.RefreshTokenRequest;
import com.BatWoman.BatWoman_backend.dto.auth.RegisterRequest;
import com.BatWoman.BatWoman_backend.dto.auth.RegisterResponse;
import com.BatWoman.BatWoman_backend.entity.RefreshToken;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.enums.Role;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.RefreshTokenRepository;
import com.BatWoman.BatWoman_backend.repository.UserRepository;
import com.BatWoman.BatWoman_backend.security.JwtService;
import com.BatWoman.BatWoman_backend.security.UserPrincipal;
import com.BatWoman.BatWoman_backend.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import java.util.UUID;
import org.springframework.security.core.userdetails.UserDetails;



@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    @Override
    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new ValidationException("Email already registered.");
        }

        if (request.phone() != null &&
                userRepository.existsByPhone(request.phone())) {

            throw new ValidationException("Phone number already registered.");
        }

        User user = User.builder()
                .id(UUID.randomUUID())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .phone(request.phone())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .verified(false)
                .active(true)
                .createdAt(OffsetDateTime.now())
                .updatedAt(OffsetDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getEmail(),
                savedUser.getPhone()
        );
    }
    @Override
    public LoginResponse login(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        User user = userRepository.findByEmail(userPrincipal.getUsername())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));

        // Remove old refresh token if it exists
        refreshTokenRepository.findByUser(user)
                .ifPresent(refreshTokenRepository::delete);

        String accessToken = jwtService.generateToken(userPrincipal);

        RefreshToken refreshToken = RefreshToken.builder()
                .id(UUID.randomUUID())
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiresAt(OffsetDateTime.now().plusDays(30))
                .revoked(false)
                .createdAt(OffsetDateTime.now())
                .build();

        refreshTokenRepository.save(refreshToken);

        user.setLastLogin(OffsetDateTime.now());
//        userRepository.save(user);

        return new LoginResponse(
                accessToken,
                refreshToken.getToken(),
                jwtService.getExpirationTime()
        );
    }
    @Override
    public LoginResponse refreshToken(RefreshTokenRequest request) {

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(request.refreshToken())
                .orElseThrow(() ->
                        new ValidationException("Invalid refresh token."));

        if (Boolean.TRUE.equals(refreshToken.getRevoked())) {
            throw new ValidationException("Refresh token has been revoked.");
        }

        if (refreshToken.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new ValidationException("Refresh token has expired.");
        }

        User user = refreshToken.getUser();

        UserDetails userDetails = new UserPrincipal(user);

        String accessToken = jwtService.generateToken(userDetails);

        return new LoginResponse(
                accessToken,
                refreshToken.getToken(),
                jwtService.getExpirationTime()
        );
    }
    @Override
    public void logout(String refreshToken) {

        RefreshToken token = refreshTokenRepository
                .findByToken(refreshToken)
                .orElseThrow(() ->
                        new ValidationException("Invalid refresh token."));

        token.setRevoked(true);

        refreshTokenRepository.save(token);
    }

    @Override
    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ValidationException("User is not authenticated.");
        }

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        return userRepository.findById(principal.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));
    }
}
