package com.tzeenttch.backend.auth.dto;

public class AuthResponse {

    private String token;

    public AuthResponse() {}

    //Constructor
    public AuthResponse(String token) {
        this.token = token;
    }

    //Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
