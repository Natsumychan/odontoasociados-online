package com.odontoapp.dto.data;

import com.odontoapp.dto.user.UsuarioResponseDTO;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CitaDTO {
    private Integer id;                // id de la cita
    private Integer pacienteId;
    private String pacienteNombre;

    private Integer odontologoId;
    private String odontologoNombre;

    private Integer tratamientoId;
    private String tratamientoNombre;

    private String fecha;              // formateado AAAA-MM-DD
    private String hora;               // formateado HH:mm

    private String estado;
    private String comentario;
}