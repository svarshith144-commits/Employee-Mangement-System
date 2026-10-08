package com.enterprise.hrms.controller;

import com.enterprise.hrms.config.JwtTokenProvider;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request) {
        // Simple JWT Auth endpoint simulation
        String token = tokenProvider.generateToken(request.getEmail(), "EMPLOYEE");
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("type", "Bearer");
        response.put("email", request.getEmail());
        response.put("message", "JWT authentication successful");
        
        return ResponseEntity.ok(response);
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }
}
