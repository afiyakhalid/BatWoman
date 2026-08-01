package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.admin.AdminReviewResponse;
import com.BatWoman.BatWoman_backend.entity.Review;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.repository.ReviewRepository;
import com.BatWoman.BatWoman_backend.service.AdminReviewService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminReviewServiceImpl implements AdminReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public List<AdminReviewResponse> getAllReviews() {

        return reviewRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();

    }

    @Override
    public void deleteReview(UUID reviewId) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found."));

        reviewRepository.delete(review);

    }

    private AdminReviewResponse toResponse(
            Review review
    ) {

        return new AdminReviewResponse(

                review.getId(),

                review.getProduct().getId(),

                review.getProduct().getName(),

                review.getUser().getId(),

                review.getUser().getFirstName() + " " +
                        review.getUser().getLastName(),

                review.getRating(),

                review.getTitle(),

                review.getComment(),

                review.getStatus().name(),

                review.getCreatedAt()

        );

    }

}