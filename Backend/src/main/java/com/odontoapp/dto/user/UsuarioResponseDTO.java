package com.odontoapp.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponseDTO {

    private Integer id;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String rol;
}