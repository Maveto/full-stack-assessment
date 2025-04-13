package com.mauricio.shop.document;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "product_reviews")
public class ProductReview {

    // ActivitiyLog attributes
    @Id
    private String id;

    private int rate; // 1 to 5
    private String comment;
    private Long userId;
    private Long productId;
    private LocalDateTime createdDate;

    // User Empty constructor
    public ProductReview() {
    }

    // User constructor with parameters
    public ProductReview(String id, int rate, String comment, Long userId, Long productId, LocalDateTime createdDate) {
        this.id = id;
        this.rate = rate;
        this.comment = comment;
        this.userId = userId;
        this.productId = productId;
        this.createdDate = createdDate;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
