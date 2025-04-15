package com.mauricio.shop.controller.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    // private final UserService userService;
    // @Autowired
    // public UserController(UserService userService) {
    //     this.userService = userService;
    // }
    // // Get the current user
    // @GetMapping("/me")
    // public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User currentUser) {
    //     return ResponseEntity.ok(currentUser);
    // }
}
