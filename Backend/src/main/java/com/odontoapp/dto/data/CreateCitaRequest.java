package com.odontoapp.dto.data;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CreateCitaRequest {

    private Integer idPaciente;       // id_usuario del paciente
    private Integer idOdontologo;     // id_usuario del odontologo
    private LocalDate fecha;       // yyyy-MM-dd
    private LocalTime hora;        // HH:mm
    private String comentario;
    private Integer  idTratamiento; // ids de tratamientos asociados
}
