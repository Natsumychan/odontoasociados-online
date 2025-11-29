package com.odontoapp.dto.data;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class TratamientoDTO {
    private Integer idTratamiento;
    private String nombre;
    private String descripcion;
    private Double costo;
}
