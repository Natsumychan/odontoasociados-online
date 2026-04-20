package com.odontoapp.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UsuarioCompletoDTO {
    private Integer id;
    private String nombre;
    private String apellido;
    private String documento;
    private String email;
    private String telefono;
    private String rol;
    private String password;

    private OdontologoDTO odontologo;
    private PacienteDTO paciente;
    private RecepcionistaDTO recepcionista;
    private AdministradorDTO administrador;
}
