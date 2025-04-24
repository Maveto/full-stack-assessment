package com.mauricio.shop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mauricio.shop.config.JwtUtil;
import com.mauricio.shop.dto.auth.AuthRequest;
import com.mauricio.shop.dto.auth.AuthResponse;
import com.mauricio.shop.dto.auth.RegisterRequest;
import com.mauricio.shop.entity.User;
import com.mauricio.shop.enums.Role;
import com.mauricio.shop.repository.jpa.UserRepository;
import static com.mauricio.shop.validator.ValidatorUtils.isNullOrEmpty;
import static com.mauricio.shop.validator.ValidatorUtils.isValidEmail;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final String adminKeyConfig;

    @Autowired
    public AuthService(UserRepository userRepository, AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder, JwtUtil jwtUtil, @Value("${app.admin.key}") String adminKeyConfig) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.adminKeyConfig = adminKeyConfig;
    }

    public AuthResponse createUser(RegisterRequest request) {
        // Check if username is empty
        if (isNullOrEmpty(request.getUsername())) {
            throw new RuntimeException("Username cannot be empty!");
        }

        // Check if password is empty
        if (isNullOrEmpty(request.getPassword())) {
            throw new RuntimeException("Password cannot be empty!");
        }

        // Check if email is invalid
        if (!isValidEmail(request.getEmail())) {
            throw new RuntimeException("Invalid email format!");
        }

        // Check if the username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists!");
        }

        // Check if the email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        // Check AdminKey
        Role role = Role.ROLE_USER;

        if (request.getAdminKey() != null && request.getAdminKey().equals(adminKeyConfig)) {
            role = Role.ROLE_ADMIN;
        }

        // Create a new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        // Save the user to the database
        userRepository.save(user);

        // Create a UserDetails object for the user
        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority(user.getRole().name()))
        );

        // Generate a JWT token for the user
        var token = jwtUtil.generateToken(userDetails);
        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest request) {
        // Check if username is empty
        if (isNullOrEmpty(request.getUsername())) {
            throw new RuntimeException("Username cannot be empty!");
        }

        // Check if password is empty
        if (isNullOrEmpty(request.getPassword())) {
            throw new RuntimeException("Password cannot be empty!");
        }

        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),
                request.getPassword()));

        // Create a UserDetails object for the user
        var userDetails = (UserDetails) authentication.getPrincipal();

        // Generate a JWT token for the user
        var token = jwtUtil.generateToken(userDetails);
        return new AuthResponse(token);
    }
}
