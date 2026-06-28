package com.BatWoman.BatWoman_backend.repository;

import com.BatWoman.BatWoman_backend.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WishListRepository extends JpaRepository<Wishlist, UUID> {

    List<Wishlist> findByUser_Id(UUID userId);

    Optional<Wishlist> findByUser_IdAndProduct_Id(UUID userId,
                                                  UUID productId);

}
