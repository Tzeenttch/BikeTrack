package com.tzeenttch.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tzeenttch.backend.model.ContactRequest;
import com.tzeenttch.backend.service.EmailService;

@CrossOrigin(origins = "http://localhost:4200") // Necesario para no tener problemas con CORS
@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired

    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Map<String, String>> handleContactForm(@RequestBody ContactRequest request) {
        emailService.sendContanctEmail(request);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Mensaje enviado correctamente");

        return ResponseEntity.ok(response);
    }

}
