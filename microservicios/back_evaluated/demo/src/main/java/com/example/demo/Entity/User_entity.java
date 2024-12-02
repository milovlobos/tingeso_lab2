package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class User_entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

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

    public User_entity(String name, String password, String email,String phone,String rut, int age, boolean employee, int a_s, int w_s, int s_c, double balance, boolean independent) {
        this.username = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.rut = rut;
        this.age = age;
        this.employee = employee;
        this.account_seniority = a_s;
        this.work_seniority = w_s;
        this.saving_capacity = s_c;
        this.balance = balance;
        this.independent = independent;

    }
    public boolean isEmployee() {
        return employee;
    }
    public  boolean isIndependent() {
        return independent;
    }

}
