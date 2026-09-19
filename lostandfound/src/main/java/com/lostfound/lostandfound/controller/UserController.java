
package com.lostfound.lostandfound.controller;

import com.lostfound.lostandfound.model.User;
import com.lostfound.lostandfound.repository.UserRepository;
import com.lostfound.lostandfound.security.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserController(UserRepository userRepository,
                          JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("User not found");
        }

        if (!passwordEncoder.matches(
                user.getPassword(),
                existingUser.get().getPassword())) {

            return ResponseEntity.badRequest()
                    .body("Incorrect password");
        }

        // Generate JWT token
        String token = jwtService.generateToken(
                existingUser.get().getEmail()
        );

        Map<String, Object> response = new HashMap<>();

        response.put("token", token);
        response.put("user", existingUser.get());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Optional<User> existingUser =
                userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Email not registered");
        }

        if (newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("New password cannot be empty");
        }

        User foundUser = existingUser.get();

        foundUser.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(foundUser);

        return ResponseEntity.ok("Password reset successfully!");
    }
}

