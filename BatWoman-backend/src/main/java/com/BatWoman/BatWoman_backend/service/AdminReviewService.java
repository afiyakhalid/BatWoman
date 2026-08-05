package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.admin.AdminReviewResponse;

import java.util.List;
import java.util.UUID;

public interface AdminReviewService {

    List<AdminReviewResponse> getAllReviews();

    void deleteReview(UUID reviewId);

}