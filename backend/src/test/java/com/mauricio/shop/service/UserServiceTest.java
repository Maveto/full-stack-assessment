package com.mauricio.shop.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.mauricio.shop.entity.User;
import com.mauricio.shop.repository.jpa.UserRepository;
import com.mauricio.shop.service.entity.UserService;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    @Test
    void testCreateUser() {
        User user = new User("test", "test@example.com", "password123");

        when(userRepository.save(any(User.class))).thenReturn(user);

        User userSaved = userService.createUser(user);

        assertNotNull(userSaved);
        assertEquals("test", userSaved.getUsername());
    }

    @Test
    void testGetUserById() {
        User user = new User();
        user.setId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        Optional<User> userFound = userService.getUserById(1L);

        assertNotNull(userFound);
        assertEquals(1L, userFound.get().getId());
    }
}
