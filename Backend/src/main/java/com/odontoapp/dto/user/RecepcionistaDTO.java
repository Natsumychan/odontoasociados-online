package com.odontoapp.dto.user;

import com.odontoapp.entity.Turno;
import lombok.Data;

@Data
public class RecepcionistaDTO {
    private Integer idUsuario;
    private UsuarioDTO usuario;
    private Turno turno;
    private String oficina;
}
