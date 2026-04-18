package com.odontoapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recepcionistas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recepcionista {
    @Id
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    @MapsId
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private Turno turno;

    @Column(name = "oficina")
    private String oficina;
}
