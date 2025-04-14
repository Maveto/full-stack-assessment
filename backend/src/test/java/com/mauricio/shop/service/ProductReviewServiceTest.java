package com.mauricio.shop.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.mauricio.shop.document.ProductReview;
import com.mauricio.shop.repository.mongo.ProductReviewRepository;
import com.mauricio.shop.service.document.ProductReviewService;

@ExtendWith(MockitoExtension.class)
class ProductReviewServiceTest {

    @Mock
    private ProductReviewRepository productReviewRepository;

    @InjectMocks
    private ProductReviewService productReviewService;

    @Test
    void testCreateProductReview() {
        ProductReview review = new ProductReview(5, "Great product!", 2L, 1L);

        when(productReviewRepository.save(any(ProductReview.class))).thenReturn(review);

        ProductReview reviewSaved = productReviewService.createProductReview(review);

        assertNotNull(reviewSaved);
        assertNotNull(reviewSaved.getCreatedDate());
        assertEquals(2L, reviewSaved.getUserId());
        assertEquals(1L, reviewSaved.getProductId());
    }
}
