package com.mauricio.shop.repository.mongo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mauricio.shop.document.Cart;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {

    public Optional<Cart> findByUserId(Long userId);

}
