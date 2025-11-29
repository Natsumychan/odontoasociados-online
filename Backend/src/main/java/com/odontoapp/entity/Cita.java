package com.odontoapp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "citas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cita")
    private Integer idCita;

    // FK al usuario paciente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_paciente", nullable = false)
    private Usuario paciente;

    // FK al usuario odontologo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_odontologo", nullable = false)
    private Usuario odontologo;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "hora", nullable = false)
    private LocalTime hora;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado; // 'pendiente', 'realizada', 'cancelada'

    @Column(name = "motivo", columnDefinition = "TEXT")
    private String motivo;

    // Relación con tratamientos (tabla de unión citas_tratamientos)
    @ManyToMany
    @JoinTable(
            name = "citas_tratamientos",
            joinColumns = @JoinColumn(name = "id_cita"),
            inverseJoinColumns = @JoinColumn(name = "id_tratamiento")
    )
    @Builder.Default
    private Set<Tratamiento> tratamientos = new HashSet<>();
}

