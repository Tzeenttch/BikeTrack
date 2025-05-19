package com.tzeenttch.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tzeenttch.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{

    boolean existsByEmail(String email);

}
