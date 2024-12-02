package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "credit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Credit_entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private int type; // 1= primera vivienda , 2=segunda vivienda ,3= propiedades comercial , 4=remodelacion
    private Long iduser;
    private float interest; // interés anual
    private int time; // plazo anual
    private int diner; // monto del financiamiento, % del valor de la propiedad
    private int state; // estado de la solicitud
    private LocalDate date; // fecha de solicitud


}



