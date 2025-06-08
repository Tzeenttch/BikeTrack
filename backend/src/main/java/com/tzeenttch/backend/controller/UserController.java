package com.tzeenttch.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tzeenttch.backend.dto.UserDTO;
import com.tzeenttch.backend.model.User;
import com.tzeenttch.backend.repository.UserRepository;
import com.tzeenttch.backend.service.UserService;

@CrossOrigin(origins = "http://localhost:4200") // Necesario para no tener problemas con CORS
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;

    }

    // Tener en cuenta hay que devolver un JSON no se puede devolver un texto plano
    // por eso uso "Map" para el formato JSON
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            userService.createUser(user);
            response.put("message", "Usuario creado exitosamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Funcion para devolver el usuario completo
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autorizado");
        }
        String token = authorizationHeader.substring(7);

        // Buscar usuario con ese token
        Optional<User> optionalUser = userRepository.findByToken(token);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
        }

        User user = optionalUser.get();
        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(userDTO);
    }

}
