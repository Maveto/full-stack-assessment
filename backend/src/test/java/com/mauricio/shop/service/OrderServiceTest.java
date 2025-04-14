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

import com.mauricio.shop.entity.Order;
import com.mauricio.shop.entity.OrderItem;
import com.mauricio.shop.entity.Product;
import com.mauricio.shop.entity.User;
import com.mauricio.shop.repository.jpa.OrderRepository;
import com.mauricio.shop.service.entity.OrderService;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;
    @InjectMocks
    private OrderService orderService;

    @Test
    void testCreateOrder() {
        User user = new User("John Doe", "john.doe@example.com", "password123");
        Product product1 = new Product("shirt", "A nice shirt", 20.0, 100, "");
        Product product2 = new Product("pants", "Some nice pants", 20.0, 100, "");
        OrderItem item1 = new OrderItem(2, product1.getPrice(), null, product1);
        OrderItem item2 = new OrderItem(3, product2.getPrice(), null, product2);
        Order order = new Order("Pending", user, List.of(item1, item2));

        item1.setOrder(order);
        item2.setOrder(order);

        when(orderRepository.save(any(Order.class))).thenReturn(order);

        Order orderSaved = orderService.createOrder(order);

        assertNotNull(orderSaved);
        assertEquals(2, orderSaved.getItems().size());
    }
}
