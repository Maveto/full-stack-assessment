package com.mauricio.shop.service.document;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mauricio.shop.document.ProductReview;
import com.mauricio.shop.repository.mongo.ProductReviewRepository;

@Service
public class ProductReviewService {

    private final ProductReviewRepository productReviewRepository;

    @Autowired
    public ProductReviewService(ProductReviewRepository productReviewRepository) {
        this.productReviewRepository = productReviewRepository;
    }

    //CREATE
    public ProductReview createProductReview(ProductReview productReview) {
        return productReviewRepository.save(productReview);
    }

    //READ
    public List<ProductReview> getAllProductReviews() {
        return productReviewRepository.findAll();
    }

    public List<ProductReview> getProductReviewsByProductId(Long porductId) {
        return productReviewRepository.findByProductId(porductId);
    }

    public Optional<ProductReview> getProductReviewById(String id) {
        return productReviewRepository.findById(id);
    }

    //UPDATE
    public Optional<ProductReview> updateProductReview(ProductReview productReview) {
        return productReviewRepository.findById(productReview.getId())
                .map(existingProductReview -> {
                    existingProductReview.setRate(productReview.getRate());
                    existingProductReview.setComment(productReview.getComment());
                    existingProductReview.setUserId(productReview.getUserId());
                    existingProductReview.setProductId(productReview.getProductId());
                    return productReviewRepository.save(existingProductReview);
                });
    }

    //DELETE
    public void deleteProductReview(String id) {
        productReviewRepository.deleteById(id);
    }
}
