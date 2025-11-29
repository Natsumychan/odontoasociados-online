package com.odontoapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "odontologos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Odontologo {

    @Id
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    @MapsId
    private Usuario usuario;

    @Column(name = "especialidad")
    private String especialidad;

    @Column(name = "numero_licencia")
    private String numeroLicencia;

    @Column(name = "trayectoria_profesional")
    private Integer trayectoriaProfesional;
}
