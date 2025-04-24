package com.mauricio.shop.dto.product;

public class ProductResponse {

    private final Long id;
    private final String name;
    private final String description;
    private final double price;
    private final int stockQuantity;
    private final String imageUrl;

    public ProductResponse(Long id, String name, String description, double price, int stockQuantity, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
