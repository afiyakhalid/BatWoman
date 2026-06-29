package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.auth.LoginRequest;
import com.BatWoman.BatWoman_backend.dto.auth.RefreshTokenRequest;
import com.BatWoman.BatWoman_backend.dto.auth.RegisterRequest;
import com.BatWoman.BatWoman_backend.dto.auth.LoginResponse;
import com.BatWoman.BatWoman_backend.dto.auth.RegisterResponse;
import com.BatWoman.BatWoman_backend.entity.User;

public interface AuthService {

    /**
     * Register a new customer.
     */
    RegisterResponse register(RegisterRequest request);

    /**
     * Authenticate user and generate JWT + Refresh Token.
     */
    LoginResponse login(LoginRequest request);

    /**
     * Generate a new Access Token using Refresh Token.
     */
    LoginResponse refreshToken(RefreshTokenRequest request);

    /**
     * Logout user by deleting refresh token.
     */
    void logout(String refreshToken);

    /**
     * Returns currently authenticated user.
     */
    User getCurrentUser();
}