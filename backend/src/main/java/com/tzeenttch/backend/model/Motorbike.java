package com.tzeenttch.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "motorbikes") // Mapea a la tabla correspondiente en la BD
public class Motorbike implements Serializable {

    // PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Al ser autoincrementado se indica de esta forman, la estrategia le indica a hibernate que para que no genere duplicados
    @Column(nullable = false, updatable = false)
    private Integer id;

    private String brand;
    private String model;
    private Integer year;
    private Integer km;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(precision = 10, scale = 2) // Especifico el tamaño del numero entero y el decimal para no tener problemas
                                       // con los valores monetarios.
    private BigDecimal price;

    @Column(name = "horsepower")
    private Integer horsePower;
    private Integer cc;

    @Column(name = "is_new")
    private boolean isNew;

    private String description;
    private Boolean available = true;
    private String type;

    // Constructor
    public Motorbike(Integer id, String brand, String model, Integer year, Integer km, String imageUrl,
            BigDecimal price, Integer stock, String description, Boolean available, Integer cc, Integer horsePower,
            boolean isNew, String type) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.km = km;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.available = available;
        this.cc = cc;
        this.horsePower = horsePower;
        this.isNew = isNew;
        this.type = type;
    }

    // Constructor vacio requerido por hibernate para poder realizar las peticiones
    public Motorbike() {
    }

    // Getters y setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getkm() {
        return km;
    }

    public void setKilometers(Integer km) {
        this.km = km;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Integer getCc() {
        return cc;
    }

    public void setCc(Integer cc) {
        this.cc = cc;
    }

    public Integer getHorsePower() {
        return horsePower;
    }

    public void setHorsePower(Integer horsePower) {
        this.horsePower = horsePower;
    }

    public boolean getIsNew() {
        return isNew;
    }

    public void setNew(boolean isNew) {
        this.isNew = isNew;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}