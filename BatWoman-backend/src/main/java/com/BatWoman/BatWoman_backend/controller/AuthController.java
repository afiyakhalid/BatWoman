package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.auth.LoginRequest;
import com.BatWoman.BatWoman_backend.dto.auth.LoginResponse;
import com.BatWoman.BatWoman_backend.dto.auth.RefreshTokenRequest;
import com.BatWoman.BatWoman_backend.dto.auth.RegisterRequest;
import com.BatWoman.BatWoman_backend.dto.auth.RegisterResponse;
import com.BatWoman.BatWoman_backend.dto.auth.UserProfileResponse;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(

            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(

            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refreshToken(

            @Valid @RequestBody RefreshTokenRequest request) {

        LoginResponse response = authService.refreshToken(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(

            @RequestParam String refreshToken) {

        authService.logout(refreshToken);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser() {

        System.out.println("********** /auth/me HIT **********");

        User user = authService.getCurrentUser();

        return ResponseEntity.ok(
                new UserProfileResponse(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getRole().name()
                )
        );


    }

}