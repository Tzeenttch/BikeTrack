package com.tzeenttch.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tzeenttch.backend.model.Motorbike;

public interface MotorbikeRepository extends JpaRepository<Motorbike, Integer>{

    void deleteMotorbikeById(Integer id);

    Optional<Motorbike> findMotorbikeById(Integer id);

}
