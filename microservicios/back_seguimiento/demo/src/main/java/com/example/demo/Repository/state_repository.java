package com.example.demo.Repository;

import com.example.demo.Entity.state_entity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface state_repository extends JpaRepository<state_entity,Long> {
    public state_entity getById(Long id);
    public  state_entity getByIdCredit(long id);
}
