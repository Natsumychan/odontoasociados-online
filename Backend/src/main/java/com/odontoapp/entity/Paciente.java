package com.odontoapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pacientes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Paciente {

    @Id
    @Column(name = "id_usuario")
    private Integer idUsuario; // misma PK que usuarios.id_usuario

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    @MapsId
    private Usuario usuario;

    @Column(name = "grupo_sanguineo")
    private String grupoSanguineo;

    @Column(name = "alergias", columnDefinition = "TEXT")
    private String alergias;

    @Column(name = "enfermedades_previas", columnDefinition = "TEXT")
    private String enfermedadesPrevias;
}