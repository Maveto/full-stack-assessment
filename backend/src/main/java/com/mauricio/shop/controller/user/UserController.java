package com.mauricio.shop.controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mauricio.shop.dto.user.ChangePasswordRequest;
import com.mauricio.shop.dto.user.UpdateUserRequest;
import com.mauricio.shop.dto.user.UserResponse;
import com.mauricio.shop.service.entity.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            UserResponse user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            UserResponse user = userService.getUserByUsername(authentication.getName());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> updateUser(Authentication authentication, @RequestBody UpdateUserRequest request) {
        try {
            UserResponse newUserData = userService.updateUser(authentication.getName(), request);
            return ResponseEntity.ok(newUserData);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        try {
            UserResponse user = userService.updateUserById(id, request);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> deleteCurrentUser(Authentication authentication) {
        try {
            userService.deleteUserByUsername(authentication.getName());
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("change-password")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody ChangePasswordRequest request) {
        try {
            userService.changeUserPassword(authentication.getName(), request);
            return ResponseEntity.ok("Password changed successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
