package com.mauricio.shop.repository.mongo;

import com.mauricio.shop.document.ProductReview;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductReviewRepository extends MongoRepository<ProductReview, String> {

}
