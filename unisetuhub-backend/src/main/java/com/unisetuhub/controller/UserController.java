package com.unisetuhub.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unisetuhub.entity.User;
import com.unisetuhub.service.UserService;

@RestController
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // GET /users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable String id) {

        User user = userService.getUserById(id);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }

    // POST /users
    @PostMapping
    public ResponseEntity<?> addUser(
            @RequestBody User user) {

        User savedUser = userService.addUser(user);

        if (savedUser == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already exists.");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser);
    }

    // PUT /users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable String id,
            @RequestBody User user) {

        User updatedUser =
                userService.updateUser(id, user);

        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedUser);
    }

    // DELETE /users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable String id) {

        boolean deleted =
                userService.deleteUser(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "User deleted successfully."
        );
    }

    // POST /users/login
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        User user =
                userService.login(
                        request.getEmail(),
                        request.getPassword()
                );

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password.");
        }

        return ResponseEntity.ok(user);
    }

    // Login request DTO
    public static class LoginRequest {

        private String email;

        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}