package com.tzeenttch.backend.dto;

import com.tzeenttch.backend.model.User;

//DTO para enviar solo los datos que quiero al frontend
public class UserDTO {
    private int id;
    private String name;
    private String email;
    private User.Role role;
    

    public UserDTO(int id, String name, String email, User.Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User.Role getRole() {
        return role;
    }

    public void setRole(User.Role role) {
        this.role = role;
    }

    



}
