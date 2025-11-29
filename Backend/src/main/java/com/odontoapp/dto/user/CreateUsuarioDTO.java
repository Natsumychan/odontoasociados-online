package com.odontoapp.dto.user;

import lombok.*;

@Data
public class CreateUsuarioDTO {
    private String nombreUsuario;
    private String clave; // en claro, service debe hashear
    private String rol;
    private String nombres;
    private String apellidos;
    private String documento;
    private String correo;
    private String telefono;
}