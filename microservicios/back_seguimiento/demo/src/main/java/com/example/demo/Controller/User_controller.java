package com.example.demo.Controller;

import com.example.demo.Entity.User_entity;
import com.example.demo.Service.User_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/api/user")
public class User_controller {
    @Autowired
    private User_service user_service;
    @Autowired
    private com.example.demo.Service.capacity_service capacity_service;

    //controlador para registrarse
    @PostMapping("/register")
    // registro usuario
    public User_entity register(@RequestBody User_entity Nuser) {
       User_entity user=user_service.register(Nuser.getUsername(), Nuser.getPassword(), Nuser.getEmail(),Nuser.getPhone(),Nuser.getRut(),Nuser.getAge(), Nuser.isEmployee(), Nuser.getAccount_seniority(),Nuser.getWork_seniority(),Nuser.getSaving_capacity(),Nuser.getBalance(), Nuser.isEmployee());

    return user;
    }


    @PostMapping  ("/login")
    public int login(@RequestBody User_entity user) {
        return user_service.login(user.getEmail(), user.getPassword());
    }

    @GetMapping("/findbyid/id")
    public User_entity findbyid(@RequestParam int id) {
        return user_service.getUser_byid(id);
    }

    @GetMapping("/getname")
    public String get_name(@RequestParam String email) {
        User_entity user= user_service.getUser_byemail(email);
        if (user==null) {
            return null;
        }
        String name = user.getUsername();
        return name;
    }

    @GetMapping("/getid")
    public Object get_id(@RequestParam String email) {
        User_entity user= user_service.getUser_byemail(email);
        if (user==null) {
            return null;
        }
        long id = user.getId();
        return id;
    }
    @GetMapping("/getisemployee")
    public boolean get_isemploye(@RequestParam String email) {
        return user_service.isemployee(email);

    }

    @GetMapping("/get")
    public User_entity get_user(@RequestParam Long user_id) {
        return user_service.getUser_byid(user_id);
    }


}
