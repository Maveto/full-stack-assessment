package com.mauricio.shop.controller.auth;

import java.time.Duration;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mauricio.shop.dto.auth.AuthRequest;
import com.mauricio.shop.dto.auth.AuthResponse;
import com.mauricio.shop.dto.auth.RegisterRequest;
import com.mauricio.shop.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final boolean secure;

    private final String sameSite;

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService, @Value("${jwt.cookie.secure:true}") boolean secure,
            @Value("${jwt.cookie.samesite:Lax}") String sameSite) {
        this.secure = secure;
        this.sameSite = sameSite;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.createUser(request);
            String token = authResponse.getToken();

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(secure) //<---- Change in prod to true
                    .path("/")
                    .maxAge(Duration.ofDays(7))
                    .sameSite(sameSite) //<---"None" if frontend and backend are in different domains
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(Map.of("message", "User successfully registered"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.login(request);
            String token = authResponse.getToken();

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(secure)
                    .path("/")
                    .maxAge(Duration.ofDays(7))
                    .sameSite(sameSite)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(Map.of("message", "User successfully logged in"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(secure)
                .path("/")
                .maxAge(0)
                .sameSite(sameSite)
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Logged out successfuly!");
    }
}
