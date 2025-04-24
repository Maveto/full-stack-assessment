package com.mauricio.shop.controller.review;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mauricio.shop.dto.review.ProductReviewRequest;
import com.mauricio.shop.dto.review.ProductReviewResponse;
import com.mauricio.shop.service.document.ProductReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ProductReviewController {

    private final ProductReviewService reviewService;

    @Autowired
    public ProductReviewController(ProductReviewService productReviewService) {
        this.reviewService = productReviewService;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<?>> getProductReviews(@PathVariable Long productId) {
        List<ProductReviewResponse> reviews = reviewService.getProductReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> getCurrentUserReviews(Authentication auth) {
        String username = auth.getName();
        List<ProductReviewResponse> reviews = reviewService.getProductReviewsByUsername(username);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> createProductReview(Authentication auth, @RequestBody ProductReviewRequest request) {
        try {
            String username = auth.getName();
            ProductReviewResponse review = reviewService.createProductReview(username, request);
            return ResponseEntity.ok(review);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred.");
        }
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> updateReview(@PathVariable String reviewId, @RequestBody ProductReviewRequest request, Authentication auth) {
        try {
            String username = auth.getName();
            ProductReviewResponse review = reviewService.updateProductReview(username, reviewId, request);
            return ResponseEntity.ok(review);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred.");
        }
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> deleteReview(@PathVariable String reviewId, Authentication auth) {
        try {
            String username = auth.getName();
            reviewService.deleteProductReview(username, reviewId);
            return ResponseEntity.ok("Review deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred.");
        }
    }

}
