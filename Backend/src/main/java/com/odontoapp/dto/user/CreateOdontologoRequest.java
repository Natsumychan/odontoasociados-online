package com.odontoapp.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOdontologoRequest {
    private UsuarioRequestDTO usuario;
    private OdontologoDTO odontologo;
}
