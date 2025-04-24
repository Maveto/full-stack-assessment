package com.mauricio.shop.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.mauricio.shop.dto.product.ProductRequest;
import com.mauricio.shop.dto.product.ProductResponse;
import com.mauricio.shop.entity.Product;
import com.mauricio.shop.repository.jpa.ProductRepository;
import com.mauricio.shop.service.entity.ProductService;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    @InjectMocks
    private ProductService productService;

    @Test
    void testCreateProduct() {
        Product product = new Product("shirt", "A nice shirt", 19.99, 100, "");

        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductRequest productRequest = new ProductRequest();
        productRequest.setName("shirt");
        productRequest.setDescription("A nice shirt");
        productRequest.setPrice(19.99);
        productRequest.setStockQuantity(100);
        productRequest.setImageUrl("");

        ProductResponse productSaved = productService.createProduct(productRequest);

        assertNotNull(productSaved);
        assertEquals("shirt", productSaved.getName());
    }
}
