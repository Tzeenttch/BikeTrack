package com.tzeenttch.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tzeenttch.backend.dto.SalesStatisticDTO;
import com.tzeenttch.backend.repository.SalesRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Necesario para no tener problemas con CORS
@RequestMapping("/statistics")
public class StatisticsController {

    private final SalesRepository salesRepository;

    public StatisticsController(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    @GetMapping("/top-brands")
    public List<SalesStatisticDTO> getTopBrands() {
        return salesRepository.findTopBrands();
    }

    @GetMapping("/most-sold")
    public List<SalesStatisticDTO> getMostSoldMotorbikes() {
        return salesRepository.findMostSoldMotorbikes();
    }

    @GetMapping("/least-sold")
    public List<SalesStatisticDTO> getLeastSoldMotorbikes() {
        return salesRepository.findLeastSoldMotorbikes();
    }

    @GetMapping("/monthly-sales")
    public List<SalesStatisticDTO> findMonthlySales() {
        List<Object[]> results = salesRepository.findMonthlySalesNative();
        List<SalesStatisticDTO> stats = new ArrayList<>();
        for (Object[] row : results) {
            String label = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            stats.add(new SalesStatisticDTO(label, count));
        }
        return stats;
    }

}
