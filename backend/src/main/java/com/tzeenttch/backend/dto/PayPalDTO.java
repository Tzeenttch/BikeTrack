package com.tzeenttch.backend.dto;

public class PayPalDTO {

    private String orderId;
    private String status;

    public PayPalDTO(){}

    public PayPalDTO(String orderId){
        this.orderId = orderId;
    }

    public PayPalDTO(String orderId, String status){
        this.orderId = orderId;
        this.status = status;
    }

    public String getOrderId() {
        return orderId;
    }

    public String getStatus() {
        return status;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
