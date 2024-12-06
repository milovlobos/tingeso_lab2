package com.example.demo.Repository;

import com.example.demo.Entity.Credit_entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface Credit_repository extends JpaRepository<Credit_entity,Long> {
    public Credit_entity getCredit_entityById(Long id);


    public List<Credit_entity> findByIduser(Long idUser);

    public List<Credit_entity> findByType(int type);





    public List<Credit_entity> findByInterest(float interest);


    public List<Credit_entity> findByTime(int time);


    public List<Credit_entity> findByDate(LocalDate date);


    public List<Credit_entity> findByDiner(int din);



}
