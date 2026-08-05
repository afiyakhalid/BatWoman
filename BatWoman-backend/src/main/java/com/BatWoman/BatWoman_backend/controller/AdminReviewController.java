package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.admin.AdminReviewResponse;
import com.BatWoman.BatWoman_backend.service.AdminReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/reviews")
@RequiredArgsConstructor
public class AdminReviewController {

    private final AdminReviewService adminReviewService;

    @GetMapping
    public ResponseEntity<List<AdminReviewResponse>> getAllReviews() {

        return ResponseEntity.ok(
                adminReviewService.getAllReviews()
        );

    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable UUID reviewId
    ) {

        adminReviewService.deleteReview(reviewId);

        return ResponseEntity.noContent().build();

    }

}