package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.review.CreateReviewRequest;
import com.BatWoman.BatWoman_backend.dto.review.ReviewResponse;
import com.BatWoman.BatWoman_backend.dto.review.UpdateReviewRequest;
import com.BatWoman.BatWoman_backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

    @RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @Valid @RequestBody CreateReviewRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(request));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable UUID reviewId,
            @Valid @RequestBody UpdateReviewRequest request) {

        return ResponseEntity.ok(
                reviewService.updateReview(reviewId, request)
        );
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable UUID reviewId) {

        reviewService.deleteReview(reviewId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getProductReviews(
            @PathVariable UUID productId) {

        return ResponseEntity.ok(
                reviewService.getProductReviews(productId)
        );
    }
}
