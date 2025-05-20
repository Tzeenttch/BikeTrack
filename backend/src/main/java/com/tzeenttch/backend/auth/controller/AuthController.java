package com.tzeenttch.backend.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200") // Necesario para no tener problemas con CORS
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            String token = jwtUtil.generateToken(request.getEmail());

            return ResponseEntity.ok(new AuthResponse(token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }

    //Clase Request
    public static class AuthRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    //Clase Response
    public static class AuthResponse {
        private String token;

        public AuthResponse(String token) { this.token = token; }
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }
}

