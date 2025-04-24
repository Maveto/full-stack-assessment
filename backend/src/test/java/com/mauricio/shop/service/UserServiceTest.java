package com.mauricio.shop.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import com.mauricio.shop.config.JwtUtil;
// import com.mauricio.shop.repository.jpa.UserRepository;
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    // @Mock
    // private UserRepository userRepository;
    // @Mock
    // private PasswordEncoder passwordEncoder;
    // @Mock
    // private JwtUtil jwtUtil;
    // @InjectMocks
    // private UserService userService;
    // @InjectMocks
    // private AuthService authService;
    @BeforeEach
    @SuppressWarnings("unused")
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser() {
        // RegisterRequest registerRequest = new RegisterRequest();
        // registerRequest.setUsername("test");
        // registerRequest.setEmail("test@example.com");
        // registerRequest.setPassword("password123");

        // User user = new User();
        // user.setUsername(registerRequest.getUsername());
        // user.setEmail(registerRequest.getEmail());
        // user.setPassword("encodedPassword");
        // user.setRole(Role.ROLE_USER);
        // when(userRepository.existsByUsername("test")).thenReturn(false);
        // when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        // when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        // when(userRepository.save(any(User.class))).thenReturn(user);
        // when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn("mocked-jwt-token");
        // AuthResponse response = authService.createUser(registerRequest);
        // assertNotNull(response);
        // assertEquals("mocked-jwt-token", response.getToken());
    }

    // @Test
    // void testGetUserById() {
    //     User user = new User();
    //     user.setId(1L);
    //     when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    //     Optional<User> userFound = userService.getUserById(1L);
    //     assertNotNull(userFound);
    //     assertEquals(1L, userFound.get().getId());
    // }
}
