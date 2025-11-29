package com.odontoapp.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tratamientos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Tratamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tratamiento")
    private Integer idTratamiento;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private Double costo;
}