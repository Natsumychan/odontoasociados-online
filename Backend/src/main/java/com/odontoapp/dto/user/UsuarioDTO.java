package com.odontoapp.dto.user;

import lombok.*;

@Data
public class UsuarioDTO {
    private Integer idUsuario;
    private String nombreUsuario;
    private String nombres;
    private String apellidos;
    private String documento;
    private String email;
    private String telefono;
    private String rol;
    private String fechaRegistro; // ISO yyyy-MM-dd
}