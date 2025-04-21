package com.mauricio.shop.service.document;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.mauricio.shop.document.Cart;
import com.mauricio.shop.document.CartItem;
import com.mauricio.shop.dto.cart.CartRequest;
import com.mauricio.shop.dto.cart.CartResponse;
import com.mauricio.shop.entity.User;
import com.mauricio.shop.repository.jpa.UserRepository;
import com.mauricio.shop.repository.mongo.CartRepository;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public CartService(CartRepository cartRepository, UserRepository userRepository, MongoTemplate mongoTemplate) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
    }

    //CREATE
    public CartResponse addItemToCart(String username, CartRequest request) {

        if (request.getProductId() == null || request.getQuantity() == null) {
            throw new RuntimeException("Product ID and quantity must be provided.");
        }

        if (request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than zero.");
        }

        Long userId = getUserIdByUsername(username);
        Cart cart = cartRepository.findByUserId(userId)
                .orElse(new Cart(userId, new ArrayList<>()));

        List<CartItem> items = cart.getItems();
        Optional<CartItem> existingItem = items.stream()
                .filter(item -> item.getProductId().equals(request.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            items.add(new CartItem(request.getProductId(), request.getQuantity()));
        }

        cart.setItems(items);
        cartRepository.save(cart);

        CartResponse cartRes = new CartResponse(cart.getId(), cart.getUserId(), cart.getItems());
        return cartRes;
    }

    //READ
    public CartResponse getCartByUserUsername(String username) {
        try {
            Long userId = getUserIdByUsername(username);
            Cart cart = cartRepository.findByUserId(userId)
                    .orElseGet(() -> {
                        Cart newCart = new Cart(userId, new ArrayList<>());
                        return cartRepository.save(newCart);
                    });
            CartResponse cartResponse = new CartResponse(cart.getId(), cart.getUserId(), cart.getItems());
            return cartResponse;
        } catch (RuntimeException e) {
            throw new RuntimeException("User not found: " + username, e);
        }
    }

    //UPDATE
    public CartResponse updateCartItem(String username, CartRequest request) {

        if (request.getProductId() == null || request.getQuantity() == null) {
            throw new RuntimeException("Product ID and quantity must be provided.");
        }

        if (request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than zero.");
        }

        Long userId = getUserIdByUsername(username);
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));

        List<CartItem> items = cart.getItems();
        boolean updated = false;

        for (CartItem item : items) {
            if (item.getProductId().equals(request.getProductId())) {
                item.setQuantity(request.getQuantity());
                updated = true;
                break;
            }
        }

        if (!updated) {
            throw new RuntimeException("Item with product ID " + request.getProductId() + " not found in cart.");
        }

        cart.setItems(items);
        cartRepository.save(cart);

        CartResponse cartRes = new CartResponse(cart.getId(), cart.getUserId(), cart.getItems());
        return cartRes;
    }

    //DELETE
    public CartResponse removeItemFromCart(String username, Long productId) {
        Long userId = getUserIdByUsername(username);
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));

        List<CartItem> updatedItems = cart.getItems().stream()
                .filter(item -> !item.getProductId().equals(productId))
                .toList();

        cart.setItems(updatedItems);
        cartRepository.save(cart);

        CartResponse cartRes = new CartResponse(cart.getId(), cart.getUserId(), cart.getItems());
        return cartRes;
    }

    public void removeProductFromAllCarts(Long productId) {
        Query query = new Query(Criteria.where("items.productId").is(productId));
        Update update = new Update().pull("items", Query.query(Criteria.where("productId").is(productId)));
        mongoTemplate.updateMulti(query, update, Cart.class);
    }

    // Helper methods
    public Long getUserIdByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}
