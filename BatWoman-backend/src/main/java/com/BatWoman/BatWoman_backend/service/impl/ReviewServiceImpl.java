package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.review.CreateReviewRequest;
import com.BatWoman.BatWoman_backend.dto.review.ReviewResponse;
import com.BatWoman.BatWoman_backend.dto.review.UpdateReviewRequest;
import com.BatWoman.BatWoman_backend.entity.Product;
import com.BatWoman.BatWoman_backend.entity.Review;
import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.enums.ReviewStatus;
import com.BatWoman.BatWoman_backend.exception.ResourceNotFoundException;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.repository.ProductRepository;
import com.BatWoman.BatWoman_backend.repository.ReviewRepository;
import com.BatWoman.BatWoman_backend.service.AuthService;
import com.BatWoman.BatWoman_backend.service.ReviewService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;
    @Override
    public ReviewResponse createReview(CreateReviewRequest request) {

        User user = authService.getCurrentUser();

        Product product = productRepository.findById(request.productId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        if (reviewRepository.findByUser_IdAndProduct_Id(
                user.getId(),
                product.getId()).isPresent()) {

            throw new ValidationException(
                    "You have already reviewed this product.");
        }

        Review review = Review.builder()
                .id(UUID.randomUUID())
                .product(product)
                .user(user)
                .rating(request.rating())
                .title(request.title())
                .comment(request.comment())
                .status(ReviewStatus.APPROVED)
                .createdAt(OffsetDateTime.now())
                .build();

        review = reviewRepository.save(review);

        return new ReviewResponse(
                review.getId(),
                product.getId(),
                user.getId(),
                user.getFirstName() + " " + user.getLastName(),
                review.getRating(),
                review.getTitle(),
                review.getComment(),
                false,
                review.getStatus().name(),
                review.getCreatedAt()
        );
    }
    @Override
    public ReviewResponse updateReview(
            UUID reviewId,
            UpdateReviewRequest request) {

        User user = authService.getCurrentUser();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found."));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new ValidationException(
                    "You can only update your own review.");
        }

        review.setRating(request.rating());
        review.setTitle(request.title());
        review.setComment(request.comment());

        review = reviewRepository.save(review);

        return new ReviewResponse(
                review.getId(),
                review.getProduct().getId(),
                user.getId(),
                user.getFirstName() + " " + user.getLastName(),
                review.getRating(),
                review.getTitle(),
                review.getComment(),
                false,
                review.getStatus().name(),
                review.getCreatedAt()
        );
    }
    @Override
    public void deleteReview(UUID reviewId) {

        User user = authService.getCurrentUser();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found."));

        if (!review.getUser().getId().equals(user.getId())) {
            throw new ValidationException(
                    "You can only delete your own review.");
        }

        reviewRepository.delete(review);
    }
    @Override
    public List<ReviewResponse> getProductReviews(UUID productId) {

        return reviewRepository.findByProduct_Id(productId)
                .stream()
                .filter(review ->
                        review.getStatus() == ReviewStatus.APPROVED)
                .map(review -> new ReviewResponse(

                        review.getId(),

                        review.getProduct().getId(),

                        review.getUser().getId(),

                        review.getUser().getFirstName()
                                + " "
                                + review.getUser().getLastName(),

                        review.getRating(),

                        review.getTitle(),

                        review.getComment(),

                        false,

                        review.getStatus().name(),

                        review.getCreatedAt()

                ))
                .toList();
    }
}