package com.tzeenttch.backend.model;

public class ContactRequest {
    private String email;
    private String phone;
    private String subject;
    private String message;

    public ContactRequest(String email, String phone, String subject, String message) {
        this.email = email;
        this.phone = phone;
        this.subject = subject;
        this.message = message;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }



}
