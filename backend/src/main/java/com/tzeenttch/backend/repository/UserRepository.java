package com.tzeenttch.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tzeenttch.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

    //Dos tipos para diferentes usos
    Optional<User> findByEmail(String email); //Optional
    boolean existsByEmail(String email); //Boolean
    Optional<User> findByToken(String token);
}
