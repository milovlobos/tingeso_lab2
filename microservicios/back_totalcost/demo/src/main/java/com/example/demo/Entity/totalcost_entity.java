package com.example.demo.Entity;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "total_cost")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class totalcost_entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private long id_credit;
    private double totalcost;
    private double costhmont;




}



