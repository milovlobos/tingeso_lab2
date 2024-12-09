package com.example.demo.Repository;

import com.example.demo.Entity.User_entity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface User_repository extends JpaRepository<User_entity,Long> {
    public Optional<User_entity> findById(Long id);
    public User_entity findByEmail(String email);
    public User_entity findByUsername(String username);
    public User_entity findByRut(String rut);
    public User_entity findByAge(int age);
    public User_entity findByPhone(String phone);

}
