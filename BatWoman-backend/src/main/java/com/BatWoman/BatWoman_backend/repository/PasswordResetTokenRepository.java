package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {

    Optional<PasswordResetToken> findTopByEmailAndUsedFalseOrderByCreatedAtDesc(String email);

    Optional<PasswordResetToken> findTopByEmailIgnoreCaseAndUsedFalseOrderByCreatedAtDesc(String email);
}