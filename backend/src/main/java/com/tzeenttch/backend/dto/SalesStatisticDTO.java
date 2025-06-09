package com.tzeenttch.backend.dto;

public class SalesStatisticDTO {

    private String label;
    private Long count;

    public SalesStatisticDTO(String label, Long count) {
        this.label = label;
        this.count = count;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    

}
