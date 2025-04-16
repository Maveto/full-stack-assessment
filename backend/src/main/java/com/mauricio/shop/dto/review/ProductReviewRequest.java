package com.mauricio.shop.dto.review;

public class ProductReviewRequest {

    private int rate; // 1 to 5
    private String comment;
    private Long productId;

    public ProductReviewRequest() {
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

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
