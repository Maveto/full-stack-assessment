package com.mauricio.shop.dto.cart;

import java.util.List;

public class CartResponse {

    private final String id;
    private final Long userId;
    private final List<EnrichedCartItemResponse> items;

    public CartResponse(String id, Long userId, List<EnrichedCartItemResponse> items) {
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

    public List<EnrichedCartItemResponse> getItems() {
        return items;
    }
}
