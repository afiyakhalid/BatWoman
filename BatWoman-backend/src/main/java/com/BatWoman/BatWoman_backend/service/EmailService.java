package com.BatWoman.BatWoman_backend.service;

public interface EmailService {

    void sendPasswordResetOtp(String toEmail, String otpCode);
}
