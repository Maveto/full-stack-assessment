package com.mauricio.shop.controller.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mauricio.shop.dto.cart.CartRequest;
import com.mauricio.shop.dto.cart.CartResponse;
import com.mauricio.shop.service.document.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<?> getCart(Authentication auth) {
        try {
            String username = auth.getName();
            CartResponse cart = cartService.getCartByUserUsername(username);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    @PostMapping
    public ResponseEntity<?> addItemToCart(Authentication auth, @RequestBody CartRequest request) {
        try {
            String username = auth.getName();
            CartResponse cart = cartService.addItemToCart(username, request);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    @PutMapping
    public ResponseEntity<?> updateCartItem(Authentication auth, @RequestBody CartRequest request) {
        try {
            String username = auth.getName();
            CartResponse cart = cartService.updateCartItem(username, request);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long productId, Authentication auth) {
        try {
            String username = auth.getName();
            CartResponse cart = cartService.removeItemFromCart(username, productId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }

    }

}
