package com.mauricio.shop.repository.mongo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mauricio.shop.document.ProductReview;

@Repository
public interface ProductReviewRepository extends MongoRepository<ProductReview, String> {

    public List<ProductReview> findByProductId(Long porductId);

    public List<ProductReview> findByUserId(Long userId);

}
