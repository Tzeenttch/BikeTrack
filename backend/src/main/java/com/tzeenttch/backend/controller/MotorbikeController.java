package com.tzeenttch.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tzeenttch.backend.model.Motorbike;
import com.tzeenttch.backend.service.MotorbikeService;

import jakarta.transaction.Transactional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:4200") //Necesario para no tener problemas con CORS
@RestController
@RequestMapping("/motorbike")
public class MotorbikeController {

    private final MotorbikeService motorbikeService;

    public MotorbikeController(MotorbikeService motorbikeService) {
        this.motorbikeService = motorbikeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Motorbike>> getAllMotorbikes() {
        List<Motorbike> motorbikes = motorbikeService.findAllMotorbikes();
        return new ResponseEntity<>(motorbikes, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Motorbike> getMotorbikeById(@PathVariable("id") Integer id) {
        Motorbike motorbike = motorbikeService.findMotorbikeById(id);
        return new ResponseEntity<>(motorbike, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Motorbike> addMotorbike(@RequestBody Motorbike motorbike) {
        Motorbike newMotorbike = motorbikeService.addMotorbike(motorbike);
        return new ResponseEntity<>(newMotorbike, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Motorbike> updateMotorbike(@RequestBody Motorbike motorbike) {
        Motorbike updateMotorbike = motorbikeService.updateMotorbike(motorbike);
        return new ResponseEntity<>(updateMotorbike, HttpStatus.OK);
    }

    @Transactional //Necesario al ser un metodo personalizado que modifica la BD
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMotorbikeById(@PathVariable("id") Integer id) {
        motorbikeService.deleteMotorbike(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
