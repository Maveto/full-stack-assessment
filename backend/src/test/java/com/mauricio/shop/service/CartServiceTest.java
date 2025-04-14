package com.mauricio.shop.service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.mauricio.shop.document.Cart;
import com.mauricio.shop.document.CartItem;
import com.mauricio.shop.repository.mongo.CartRepository;
import com.mauricio.shop.service.document.CartService;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartRepository cartRepository;
    @InjectMocks
    private CartService cartService;

    @Test
    void testCreateCart() {
        CartItem item1 = new CartItem(1L, 2);
        CartItem item2 = new CartItem(2L, 2);
        Cart cart = new Cart();

        cart.setUserId(1L);
        cart.setItems(List.of(item1, item2));

        when(cartRepository.save(any(Cart.class))).thenReturn(cart);

        Cart cartSaved = cartService.createCart(cart);

        assertNotNull(cartSaved);
        assertEquals(2, cartSaved.getItems().size());
    }
}
