package com.mauricio.shop.document;

public class CartItem {

    // ActivitiyLog attributes
    private Long productId;
    private Integer quantity;

    // User Empty constructor
    public CartItem() {
    }

    // User constructor with parameters
    public CartItem(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
