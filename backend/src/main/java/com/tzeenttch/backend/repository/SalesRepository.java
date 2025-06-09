package com.tzeenttch.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tzeenttch.backend.dto.SalesStatisticDTO;
import com.tzeenttch.backend.model.Sale;

@Repository
public interface SalesRepository extends JpaRepository<Sale, Integer> {

       @Query("SELECT new com.tzeenttch.backend.dto.SalesStatisticDTO(m.brand, COUNT(s)) " +
                     "FROM Sale s JOIN Motorbike m ON s.motorbike.id = m.id " +
                     "GROUP BY m.brand " +
                     "ORDER BY COUNT(s) DESC")
       List<SalesStatisticDTO> findTopBrands();

       @Query("SELECT new com.tzeenttch.backend.dto.SalesStatisticDTO(m.model, COUNT(s)) " +
                     "FROM Sale s JOIN Motorbike m ON s.motorbike.id = m.id " +
                     "GROUP BY m.model " +
                     "ORDER BY COUNT(s) DESC")
       List<SalesStatisticDTO> findMostSoldMotorbikes();

       @Query("SELECT new com.tzeenttch.backend.dto.SalesStatisticDTO(m.model, COUNT(s)) " +
                     "FROM Sale s JOIN Motorbike m ON s.motorbike.id = m.id " +
                     "GROUP BY m.model " +
                     "ORDER BY COUNT(s) ASC")
       List<SalesStatisticDTO> findLeastSoldMotorbikes();

       @Query(value = "SELECT DATE_FORMAT(s.sale_date, '%Y-%m') AS label, COUNT(*) AS count " +
                     "FROM sales s " +
                     "GROUP BY label " +
                     "ORDER BY label", nativeQuery = true)
       List<Object[]> findMonthlySalesNative();

}
