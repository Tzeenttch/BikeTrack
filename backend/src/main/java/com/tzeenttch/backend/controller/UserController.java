package com.tzeenttch.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tzeenttch.backend.model.User;
import com.tzeenttch.backend.service.UserService;

@CrossOrigin(origins = "http://localhost:4200") // Necesario para no tener problemas con CORS
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    //Tener en cuenta hay que devolver un JSON no se puede devolver un texto plano por eso uso "Map" para el formato JSON
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
}

