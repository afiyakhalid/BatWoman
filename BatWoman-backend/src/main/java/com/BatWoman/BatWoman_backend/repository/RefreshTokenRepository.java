package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.RefreshToken;
import com.BatWoman.BatWoman_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(User user);
    void deleteByUser(User user);

}
