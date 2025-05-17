package com.tzeenttch.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tzeenttch.backend.exception.MotorbikeNotFoundException;
import com.tzeenttch.backend.model.Motorbike;
import com.tzeenttch.backend.repository.MotorbikeRepository;

@Service
public class MotorbikeService {
    private final MotorbikeRepository motorbikeRepository;

    @Autowired //Inyecta automaticamente las dependecias de la clase
    public MotorbikeService(MotorbikeRepository motorbikeRepository) {
        this.motorbikeRepository = motorbikeRepository;
    }

    public Motorbike addMotorbike(Motorbike motorbike){
        return motorbikeRepository.save(motorbike);
    }

    public List<Motorbike> findAllMotorbikes(){
        return motorbikeRepository.findAll();
    }

    public Motorbike updateMotorbike(Motorbike motorbike){
        return motorbikeRepository.save(motorbike);
    }

    public Motorbike findMotorbikeById(Integer id){
        return motorbikeRepository.findMotorbikeById(id).orElseThrow(()-> new MotorbikeNotFoundException("Motorbike with id: " + id + " was not found"));
    }

    public void delteMotorbike(Integer id){
        motorbikeRepository.deleteMotorbikeById(id);
    }



}
