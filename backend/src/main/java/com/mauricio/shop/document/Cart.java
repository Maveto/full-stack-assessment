package com.mauricio.shop.document;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "carts")
public class Cart {

    // ActivitiyLog attributes
    @Id
    private String id;

    private Long userId;
    private List<CartItem> items;

    // User Empty constructor
    public Cart() {
    }

    // User constructor with parameters
    public Cart(Long userId, List<CartItem> items) {
        this.userId = userId;
        this.items = items;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }
}
