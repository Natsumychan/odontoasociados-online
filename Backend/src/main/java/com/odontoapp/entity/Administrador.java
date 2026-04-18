package com.odontoapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "administradores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Administrador {
    @Id
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    @MapsId
    private Usuario usuario;

    @Column(name = "area_cargo")
    private String areaCargo;

    @Column(name = "nivel_acceso")
    private Integer nivelAcceso;
}
