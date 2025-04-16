package com.mauricio.shop.dto.cart;

import java.util.List;

import com.mauricio.shop.document.CartItem;

public class CartResponse {

    private final String id;
    private final Long userId;
    private final List<CartItem> items;

    public CartResponse(String id, Long userId, List<CartItem> items) {
        this.id = id;
        this.userId = userId;
        this.items = items;
    }

    public String getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public List<CartItem> getItems() {
        return items;
    }
}
