package com.tzeenttch.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import com.tzeenttch.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzeenttch.backend.model.Motorbike;
import com.tzeenttch.backend.model.Sale;
import com.tzeenttch.backend.repository.SaleRepository;

@Service
public class SaleService {

    private final UserRepository userRepository;

    @Autowired
    private SaleRepository saleRepository;

    SaleService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<Sale> getSalesByCustomerId(Long customerId) {
        return saleRepository.findByCustomerId(customerId);
    }

    public List<Motorbike> getMotorbikesByUserId(Long userId) {
        return saleRepository.findByCustomerId(userId).stream()
                .map(Sale::getMotorbike)
                .collect(Collectors.toList());
    }


}
