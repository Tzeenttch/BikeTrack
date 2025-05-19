package com.tzeenttch.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.tzeenttch.backend.model.ContactRequest;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContanctEmail(ContactRequest request){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("ajimjim063s@iesmartinezm.es");
        message.setSubject("Formulario Contacto: " + request.getSubject());
        message.setText(
            "Correo: " + request.getEmail() +"\n" +
            "Telefono: " + request.getPhone() + "\n" +
            "Mensaje: \n" + request.getMessage()
        );
        mailSender.send(message);
    }
}
