package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.review.CreateReviewRequest;
import com.BatWoman.BatWoman_backend.dto.review.UpdateReviewRequest;
import com.BatWoman.BatWoman_backend.dto.review.ReviewResponse;

import java.util.List;
import java.util.UUID;

public interface ReviewService {

    ReviewResponse createReview(CreateReviewRequest request);

    ReviewResponse updateReview(
            UUID reviewId,
            UpdateReviewRequest request
    );

    void deleteReview(UUID reviewId);

    List<ReviewResponse> getProductReviews(UUID productId);

}