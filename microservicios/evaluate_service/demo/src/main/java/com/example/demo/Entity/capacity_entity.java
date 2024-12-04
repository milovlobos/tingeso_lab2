package com.example.demo.Entity;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "capacity")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class capacity_entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private long id_credit;
    private long id_user;
    private String creditSavingCapacity;

    @ElementCollection
    @CollectionTable(name = "credit_application", joinColumns = @JoinColumn(name = "capacity_id"))
    @Column(name = "application")
    private List<String> creditApplication = new ArrayList<>();
}



