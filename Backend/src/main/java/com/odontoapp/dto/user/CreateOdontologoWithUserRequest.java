package com.odontoapp.dto.user;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CreateOdontologoWithUserRequest {
    private UsuarioRequestDTO usuario;
    private OdontologoDTO odontologo;
}
