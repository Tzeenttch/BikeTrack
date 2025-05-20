package com.tzeenttch.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tzeenttch.backend.model.User;
import com.tzeenttch.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("El correo ya está en uso");
        }

        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setRole(User.Role.user);
        newUser.setPassword(passwordEncoder.encode(user.getPassword())); //Codificado de contraseña
        userRepository.save(newUser);
    }
}