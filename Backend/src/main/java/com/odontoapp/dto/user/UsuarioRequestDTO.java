package com.odontoapp.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioRequestDTO {

    private String nombre;
    private String apellido;
    private String email;
    private String documento;
    private String telefono;
    private String password;
    private String rol;
}
