package com.tzeenttch.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tzeenttch.backend.model.Sale;
import com.tzeenttch.backend.service.SaleService;

@RestController
@RequestMapping("/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping("/user/{customerId}")
    public List<Sale> getSalesByUser(@PathVariable Long customerId) {
        return saleService.getSalesByCustomerId(customerId);
    }

}
