package com.odontoapp.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRecepcionistaRequest {
    private UsuarioRequestDTO usuario;
    private RecepcionistaDTO recepcionista;
}
