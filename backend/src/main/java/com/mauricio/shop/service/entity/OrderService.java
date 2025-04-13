package com.mauricio.shop.service.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mauricio.shop.entity.Order;
import com.mauricio.shop.repository.jpa.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRespository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRespository = orderRepository;
    }

    //CREATE
    public Order createOrder(Order order) {
        // Establish order creation time
        order.setCreatedAt(LocalDateTime.now());

        // Get total amount from order items
        double totalAmount = order.getItems().stream().map(item -> item.getPrice() * item.getQuantity())
                .reduce(0.0, Double::sum);

        order.setTotalAmount(totalAmount);
        order.setStatus("Pending"); // Set default status to "Pending"

        return orderRespository.save(order);
    }

    //READ
    public List<Order> getAllOrders() {
        return orderRespository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRespository.findById(id);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRespository.findByUserId(userId);
    }

    //UPDATE
    public Optional<Order> updateOrder(Order order) {
        return orderRespository.findById(order.getId())
                .map(existingOrder -> {
                    existingOrder.setStatus(order.getStatus());
                    existingOrder.setTotalAmount(order.getTotalAmount());
                    existingOrder.setCreatedAt(order.getCreatedAt());
                    existingOrder.setUser(order.getUser());
                    existingOrder.setItems(order.getItems());
                    return orderRespository.save(existingOrder);
                });
    }

    //DELETE
    public void deleteOrder(Long id) {
        if (!orderRespository.existsById(id)) {
            throw new RuntimeException("Order not found with id: " + id);
        }
        orderRespository.deleteById(id);
    }
}
