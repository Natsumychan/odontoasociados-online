package com.odontoapp.dto.data;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CreateCitaRequest {

    private Integer idPaciente;
    private Integer idOdontologo;

    private LocalDate fecha;
    private LocalTime hora;

    private String motivo;

    // 🔥 IMPORTANTE: lista de tratamientos
    private List<Integer> tratamientosIds;
}
