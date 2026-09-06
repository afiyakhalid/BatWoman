package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WishlistRepository extends JpaRepository<Wishlist, UUID> {

    List<Wishlist> findByUserOrderByCreatedAtDesc(User user);

    Optional<Wishlist> findByUser_IdAndProduct_Id(
            UUID userId,
            UUID productId
    );

    boolean existsByUser_IdAndProduct_Id(
            UUID userId,
            UUID productId
    );

    void deleteByUser_IdAndProduct_Id(
            UUID userId,
            UUID productId
    );
}