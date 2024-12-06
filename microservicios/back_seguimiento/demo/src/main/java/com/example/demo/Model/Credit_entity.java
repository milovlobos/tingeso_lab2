package com.example.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class Credit_entity {


    private int type; // 1= primera vivienda , 2=segunda vivienda ,3= propiedades comercial , 4=remodelacion
    private Long iduser;
    private float interest; // interés anual
    private int time; // plazo anual
    private int diner; // monto del financiamiento, % del valor de la propiedad
    private LocalDate date; // fecha de solicitud


}



