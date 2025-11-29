package com.odontoapp.dto.user;

import lombok.*;

@Data
public class PacienteDTO {
    private Integer idUsuario;
    private UsuarioDTO usuario;
    private String grupoSanguineo;
    private String alergias;
    private String enfermedadesPrevias;
}
