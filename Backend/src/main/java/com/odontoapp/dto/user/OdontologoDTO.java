package com.odontoapp.dto.user;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class OdontologoDTO {
    private Integer idUsuario;
    // Usuario vinculado
    private UsuarioResponseDTO usuario;
    private String especialidad;
    private String numeroLicencia;
    private Integer trayectoriaProfesional;
}
