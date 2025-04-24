package com.mauricio.shop.dto.product;

import java.util.Optional;

public class PartialProductRequest {

    private Optional<String> name = Optional.empty();
    private Optional<String> description = Optional.empty();
    private Optional<Double> price = Optional.empty();
    private Optional<Integer> stockQuantity = Optional.empty();
    private Optional<String> imageUrl = Optional.empty();

    public PartialProductRequest() {
    }

    public Optional<String> getName() {
        return name;
    }

    public void setName(Optional<String> name) {
        this.name = name;
    }

    public Optional<String> getDescription() {
        return description;
    }

    public void setDescription(Optional<String> description) {
        this.description = description;
    }

    public Optional<Double> getPrice() {
        return price;
    }

    public void setPrice(Optional<Double> price) {
        this.price = price;
    }

    public Optional<Integer> getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Optional<Integer> stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Optional<String> getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(Optional<String> imageUrl) {
        this.imageUrl = imageUrl;
    }
}
