package com.mauricio.shop.controller.auth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mauricio.shop.dto.AuthRequest;
import com.mauricio.shop.dto.AuthResponse;
import com.mauricio.shop.dto.RegisterRequest;
import com.mauricio.shop.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.createUser(request);
            Map<String, String> responseMap = Map.of("token", response.getToken());
            return ResponseEntity.ok(responseMap);
        } catch (RuntimeException e) {
            Map<String, String> responseMap = Map.of("error", e.getMessage());
            return ResponseEntity.badRequest().body(responseMap);
        } catch (Exception e) {
            Map<String, String> responseMap = Map.of("error", "An unexpected error occurred");
            return ResponseEntity.status(500).body(responseMap);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.login(request);
            Map<String, String> responseMap = Map.of("token", response.getToken());
            return ResponseEntity.ok(responseMap);
        } catch (RuntimeException e) {
            Map<String, String> responseMap = Map.of("error", e.getMessage());
            return ResponseEntity.badRequest().body(responseMap);
        } catch (Exception e) {
            Map<String, String> responseMap = Map.of("error", "An unexpected error occurred");
            return ResponseEntity.status(500).body(responseMap);
        }
    }
}
