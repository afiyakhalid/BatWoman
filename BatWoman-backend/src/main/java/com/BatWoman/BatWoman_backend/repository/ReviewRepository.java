package com.BatWoman.BatWoman_backend.repository;
import java.util.Optional;
import com.BatWoman.BatWoman_backend.entity.Review;
import com.BatWoman.BatWoman_backend.enums.ReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    List<Review> findByProduct_Id(UUID productId);

    List<Review> findByUser_Id(UUID userId);

    List<Review> findByStatus(ReviewStatus status);
    Optional<Review> findByUser_IdAndProduct_Id(
            UUID userId,
            UUID productId
    );
}
