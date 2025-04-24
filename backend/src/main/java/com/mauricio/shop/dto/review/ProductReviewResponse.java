package com.mauricio.shop.dto.review;

import java.time.LocalDateTime;

public class ProductReviewResponse {

    private final String id;
    private final int rate;
    private final String comment;
    private final Long userId;
    private final Long productId;
    private final LocalDateTime createdDate;

    public ProductReviewResponse(String id, int rate, String comment, Long userId, Long productId, LocalDateTime createdDate) {
        this.id = id;
        this.rate = rate;
        this.comment = comment;
        this.userId = userId;
        this.productId = productId;
        this.createdDate = createdDate;
    }

    public String getId() {
        return id;
    }

    public int getRate() {
        return rate;
    }

    public String getComment() {
        return comment;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getProductId() {
        return productId;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
}
