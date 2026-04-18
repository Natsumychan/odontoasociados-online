package com.odontoapp.dto.user;

import lombok.Data;

@Data
public class AdministradorDTO {
    private Integer idUsuario;
    private String areaCargo;
    private Integer nivelAcceso;
}
