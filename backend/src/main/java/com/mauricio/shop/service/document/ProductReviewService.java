package com.mauricio.shop.service.document;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mauricio.shop.document.ProductReview;
import com.mauricio.shop.dto.review.ProductReviewRequest;
import com.mauricio.shop.dto.review.ProductReviewResponse;
import com.mauricio.shop.repository.jpa.UserRepository;
import com.mauricio.shop.repository.mongo.ProductReviewRepository;

@Service
public class ProductReviewService {

    private final ProductReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProductReviewService(ProductReviewRepository productReviewRepository, UserRepository userRepository) {
        this.reviewRepository = productReviewRepository;
        this.userRepository = userRepository;
    }

    //CREATE
    public ProductReviewResponse createProductReview(String username, ProductReviewRequest request) {

        if (request.getRate() < 1 || request.getRate() > 5) {
            throw new RuntimeException("Rate must be between 1 and 5.");
        }

        if (request.getProductId() == null) {
            throw new RuntimeException("Product ID cannot be null.");
        }

        Long userId = getUserIdByUsername(username);
        ProductReview review = new ProductReview(
                request.getRate(),
                request.getComment(),
                userId,
                request.getProductId()
        );

        review.setCreatedDate(LocalDateTime.now());
        reviewRepository.save(review);

        return new ProductReviewResponse(
                review.getId(),
                review.getRate(),
                review.getComment(),
                review.getUserId(),
                review.getProductId(),
                review.getCreatedDate()
        );
    }

    //READ
    public List<ProductReviewResponse> getProductReviewsByProductId(Long productId) {
        List<ProductReview> reviews = reviewRepository.findByProductId(productId);
        return reviews.stream()
                .map(review -> new ProductReviewResponse(
                review.getId(),
                review.getRate(),
                review.getComment(),
                review.getUserId(),
                review.getProductId(),
                review.getCreatedDate()
        )).toList();
    }

    public List<ProductReviewResponse> getProductReviewsByUsername(String username) {
        Long userId = getUserIdByUsername(username);
        List<ProductReview> reviews = reviewRepository.findByUserId(userId);
        return reviews.stream()
                .map(review -> new ProductReviewResponse(
                review.getId(),
                review.getRate(),
                review.getComment(),
                review.getUserId(),
                review.getProductId(),
                review.getCreatedDate()
        )).toList();
    }

    //UPDATE
    public ProductReviewResponse updateProductReview(String username, String reviewId, ProductReviewRequest request) {

        ProductReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        Long userId = getUserIdByUsername(username);
        if (!review.getUserId().equals(userId)) {
            throw new RuntimeException("You can only update your own reviews.");
        }

        if (request.getRate() < 1 || request.getRate() > 5) {
            throw new RuntimeException("Rate must be between 1 and 5.");
        }

        if (request.getProductId() == null) {
            throw new RuntimeException("Product ID cannot be null.");
        }

        review.setRate(request.getRate());
        review.setComment(request.getComment());
        review.setProductId(request.getProductId());
        review.setCreatedDate(LocalDateTime.now());
        reviewRepository.save(review);

        return new ProductReviewResponse(
                review.getId(),
                review.getRate(),
                review.getComment(),
                review.getUserId(),
                review.getProductId(),
                review.getCreatedDate()
        );
    }

    //DELETE
    public void deleteProductReview(String username, String reviewId) {
        ProductReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        Long userId = getUserIdByUsername(username);
        if (!review.getUserId().equals(userId)) {
            throw new RuntimeException("You can only delete your own reviews.");
        }
        reviewRepository.delete(review);
    }

    // Helper methods
    private Long getUserIdByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username))
                .getId();
    }
}
