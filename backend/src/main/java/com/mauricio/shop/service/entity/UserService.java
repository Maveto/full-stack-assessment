package com.mauricio.shop.service.entity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mauricio.shop.dto.user.ChangePasswordRequest;
import com.mauricio.shop.dto.user.UpdateUserRequest;
import com.mauricio.shop.dto.user.UserResponse;
import com.mauricio.shop.entity.User;
import com.mauricio.shop.repository.jpa.UserRepository;
import static com.mauricio.shop.validator.ValidatorUtils.isNullOrEmpty;
import static com.mauricio.shop.validator.ValidatorUtils.isValidEmail;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //CREATE (Create methods are in the AuthService)
    //READ
    public List<UserResponse> getAllUsers() {
        var users = userRepository.findAll();

        List<UserResponse> usersRes = users.stream()
                .map(user -> new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole()))
                .toList();

        return usersRes;
    }

    public UserResponse getUserById(Long id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        UserResponse userRes = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
        return userRes;
    }

    public UserResponse getUserByUsername(String username) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    //UPDATE
    public UserResponse updateUser(String username, UpdateUserRequest request) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        if (isNullOrEmpty(request.getEmail())) {
            throw new IllegalArgumentException("Email cannot be null");
        }

        if (!isValidEmail(request.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        if (request.getEmail().equals(user.getEmail()) || userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        user.setEmail(request.getEmail());

        userRepository.save(user);
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    public UserResponse updateUserById(Long id, UpdateUserRequest request) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (isNullOrEmpty(request.getEmail())) {
            throw new IllegalArgumentException("Email cannot be null");
        }

        if (!isValidEmail(request.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        if (request.getEmail().equals(user.getEmail()) || userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        user.setEmail(request.getEmail());

        userRepository.save(user);
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }

    public void changeUserPassword(String username, ChangePasswordRequest request) {
        if (isNullOrEmpty(request.getCurrentPassword()) || isNullOrEmpty(request.getNewPassword())) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (request.getCurrentPassword().equals(request.getNewPassword())) {
            throw new IllegalArgumentException("New password cannot be the same as the current password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    //DELETE
    public void deleteUserByUsername(String username) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        userRepository.delete(user);
    }

    public void deleteUserById(Long id) {
        if (!userRepository.existsById((id))) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
