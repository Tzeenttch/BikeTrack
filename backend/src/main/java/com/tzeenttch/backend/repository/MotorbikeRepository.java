package com.tzeenttch.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tzeenttch.backend.model.Motorbike;

public interface MotorbikeRepository extends JpaRepository<Motorbike, Integer> {

    void deleteMotorbikeById(Integer id);

    Optional<Motorbike> findMotorbikeById(Integer id);

    //Anotaciones para evitar el case sensitive
    @Query("SELECT m FROM Motorbike m WHERE "
            + "LOWER(m.brand) = LOWER(:brand) AND "
            + "LOWER(m.model) = LOWER(:model) AND "
            + "m.year = :year")
    List<Motorbike> findByBrandAndModelAndYear(
            @Param("brand") String brand,
            @Param("model") String model,
            @Param("year") Integer year);

}
