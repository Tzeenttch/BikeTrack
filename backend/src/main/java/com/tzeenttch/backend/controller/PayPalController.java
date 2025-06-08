package com.tzeenttch.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tzeenttch.backend.dto.PayPalDTO;
import com.tzeenttch.backend.service.PayPalService;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/paypal")
@CrossOrigin(origins = "http://localhost:4200") // Necesario para no tener problemas con CORS
public class PayPalController {

    @Autowired
    private PayPalService payPalService;

    @PostMapping("/create-order")
    public PayPalDTO createOrder(@RequestParam String total, @RequestParam String currency) throws IOException {
        return payPalService.createOrder(total, currency);
    }

    @PostMapping("/capture-order/{orderId}")
    public PayPalDTO captureOrder(@PathVariable String orderId) throws IOException {
        return payPalService.captureOrder(orderId);
    }

}
