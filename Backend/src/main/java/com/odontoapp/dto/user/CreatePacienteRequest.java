package com.odontoapp.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePacienteRequest {
    private UsuarioRequestDTO usuario;
    private PacienteDTO paciente;
}


