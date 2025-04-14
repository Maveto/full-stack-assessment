package com.mauricio.shop.repository.mongo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mauricio.shop.document.Cart;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {

    public List<Cart> findByUserId(Long userId);

}
