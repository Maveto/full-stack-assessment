package com.mauricio.shop.service.document;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mauricio.shop.document.Cart;
import com.mauricio.shop.document.CartItem;
import com.mauricio.shop.repository.mongo.CartRepository;

@Service
public class CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    //CREATE
    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Optional<Cart> addItemToCart(String cartId, CartItem item) {
        return cartRepository.findById(cartId)
                .map(cart -> {
                    cart.getItems().add(item);
                    return cartRepository.save(cart);
                });
    }

    //READ
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public List<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public Optional<Cart> getCartById(String id) {
        return cartRepository.findById(id);
    }

    //UPDATE
    public Optional<Cart> updateCart(Cart cart) {
        return cartRepository.findById(cart.getId())
                .map(existingCart -> {
                    existingCart.setUserId(cart.getUserId());
                    existingCart.setItems(cart.getItems());
                    return cartRepository.save(existingCart);
                });
    }

    //DELETE
    public void deleteCart(String id) {
        if (!cartRepository.existsById(id)) {
            throw new RuntimeException("Cart with id " + id + " does not exist.");
        }
        cartRepository.deleteById(id);
    }

    public Optional<Cart> removeItemFromCart(String cartId, Long itemId) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            cart.getItems().removeIf(item -> item.getProductId().equals(itemId));
            return Optional.of(cartRepository.save(cart));
        } else {
            return Optional.empty();
        }
    }
}
