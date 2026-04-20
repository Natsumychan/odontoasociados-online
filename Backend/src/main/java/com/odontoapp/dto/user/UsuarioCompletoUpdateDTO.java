package com.odontoapp.dto.user;

import lombok.Data;

@Data
public class UsuarioCompletoUpdateDTO {
    // 🔵 Usuario base
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
    private String documento;
    private String password;
    private String rol;

    //  Odontólogo
    private String especialidad;
    private String numeroLicencia;
    private Integer trayectoriaProfesional;

    // Recepcionista
    private String turno;
    private String oficina;

    // Paciente
    private String grupoSanguineo;
    private String eps;
    private String alergias;
    private String medicamentoAlergias;

    // Administrador
    private String areaCargo;
    private Integer nivelAcceso;
}
