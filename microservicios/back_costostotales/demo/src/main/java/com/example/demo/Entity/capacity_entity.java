package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Long id_credit;
    private String R1;
    private String R2;
    private String R3;
    private String R4;
    private String R5;
    private String R6;
    private String R7;
    private Boolean R71;
    private Boolean R72;
    private Boolean R73;
    private Boolean R74;
    private Boolean R75;


}
