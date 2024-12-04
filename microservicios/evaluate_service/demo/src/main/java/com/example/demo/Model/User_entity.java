package com.example.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class User_entity {

    private String username;
    private String email;
    private String password;
    private String phone;
    private String rut;
    private int age;
    private boolean employee; //si es true es ejecutivo
    //valores numericos
    private int account_seniority;
    private int work_seniority;
    private int saving_capacity;
    private double balance;
    private boolean independent;

}