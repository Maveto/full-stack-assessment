package com.mauricio.shop.service.entity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mauricio.shop.dto.product.PartialProductRequest;
import com.mauricio.shop.dto.product.ProductRequest;
import com.mauricio.shop.dto.product.ProductResponse;
import com.mauricio.shop.entity.Product;
import com.mauricio.shop.repository.jpa.ProductRepository;
import static com.mauricio.shop.validator.ValidatorUtils.isNullOrEmpty;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //CREATE
    public ProductResponse createProduct(ProductRequest request) {
        if (isNullOrEmpty(request.getName())) {
            throw new RuntimeException("Product name cannot be null or empty");
        }

        if (isNullOrEmpty(request.getDescription())) {
            throw new RuntimeException("Product description cannot be null or empty");
        }

        if (request.getPrice() < 0) {
            throw new RuntimeException("Product price cannot be negative");
        }

        if (request.getStockQuantity() < 0) {
            throw new RuntimeException("Product stock quantity cannot be negative");
        }

        Product product = new Product(request.getName(), request.getDescription(), request.getPrice(),
                request.getStockQuantity(), request.getImageUrl());

        productRepository.save(product);

        ProductResponse productRes = new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getImageUrl()
        );

        return productRes;
    }

    //READ
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductResponse> productsRes = products.stream()
                .map(product -> new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getImageUrl()
        )).toList();
        return productsRes;
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        ProductResponse productRes = new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getImageUrl()
        );
        return productRes;
    }

    //UPDATE
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        if (isNullOrEmpty(request.getName())) {
            throw new RuntimeException("Product name cannot be empty");
        }

        if (isNullOrEmpty(request.getDescription())) {
            throw new RuntimeException("Product description cannot be empty");
        }

        if (request.getPrice() < 0) {
            throw new RuntimeException("Product price cannot be negative");
        }

        if (request.getStockQuantity() < 0) {
            throw new RuntimeException("Product stock quantity cannot be negative");
        }

        existingProduct.setName(request.getName());
        existingProduct.setDescription(request.getDescription());
        existingProduct.setPrice(request.getPrice());
        existingProduct.setStockQuantity(request.getStockQuantity());
        existingProduct.setImageUrl(request.getImageUrl());

        productRepository.save(existingProduct);

        ProductResponse productRes = new ProductResponse(
                existingProduct.getId(),
                existingProduct.getName(),
                existingProduct.getDescription(),
                existingProduct.getPrice(),
                existingProduct.getStockQuantity(),
                existingProduct.getImageUrl()
        );

        return productRes;
    }

    public ProductResponse partialProductUpdate(Long id, PartialProductRequest request) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        request.getName().ifPresent(name -> {
            if (isNullOrEmpty(name)) {
                throw new RuntimeException("Product name cannot be empty");
            }
            existingProduct.setName(name);
        });

        request.getDescription().ifPresent(description -> {
            if (isNullOrEmpty(description)) {
                throw new RuntimeException("Product description cannot be empty");
            }
            existingProduct.setDescription(description);
        });

        request.getPrice().ifPresent(price -> {
            if (price < 0) {
                throw new RuntimeException("Product price cannot be negative");
            }
            existingProduct.setPrice(price);
        });

        request.getStockQuantity().ifPresent(stockQuantity -> {
            if (stockQuantity < 0) {
                throw new RuntimeException("Product stock quantity cannot be negative");
            }
            existingProduct.setStockQuantity(stockQuantity);
        });

        request.getImageUrl().ifPresent(existingProduct::setImageUrl);

        productRepository.save(existingProduct);

        ProductResponse productRes = new ProductResponse(
                existingProduct.getId(),
                existingProduct.getName(),
                existingProduct.getDescription(),
                existingProduct.getPrice(),
                existingProduct.getStockQuantity(),
                existingProduct.getImageUrl()
        );

        return productRes;
    }

    //DELETE
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
