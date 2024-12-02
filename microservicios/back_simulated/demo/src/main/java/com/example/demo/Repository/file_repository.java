package com.example.demo.Repository;
import com.example.demo.Entity.file_entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface file_repository extends JpaRepository<file_entity,Long> {

    file_entity getByCreditIdAndType(long creditId,int type);
    file_entity deleteByCreditId(long creditId);
    List<file_entity> findAllByCreditId(long creditId);
}