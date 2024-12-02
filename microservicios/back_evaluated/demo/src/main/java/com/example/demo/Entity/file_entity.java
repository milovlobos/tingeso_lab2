package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "files")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class file_entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true,nullable = false)
    private long Id;

    private long creditId;
    private String filename;

    // 1=C_I,2=C_A,3=H_C,4=EP_V,5=E_F_N,6=P_D_N,7=P_R,8=C_A_A
    private int type;

    @Lob
    private byte[] fileContent;
}