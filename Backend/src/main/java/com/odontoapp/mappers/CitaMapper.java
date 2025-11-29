//package com.odontoapp.mappers;
//
//import com.odontoapp.dto.data.CitaDTO;
//import com.odontoapp.entity.Cita;
//import org.mapstruct.Mapper;
//import org.mapstruct.Mapping;
//import org.mapstruct.ReportingPolicy;
//
//@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
//public interface CitaMapper {
//
//    // ID de la cita
//    @Mapping(target = "id", source = "idCita")
//
//    // Paciente
//    @Mapping(target = "pacienteId", source = "paciente.idUsuario")
//    @Mapping(target = "pacienteNombre",
//            expression = "java(c.getPaciente().getNombres() + \" \" + c.getPaciente().getApellidos())")
//
//    // Odontólogo
//    @Mapping(target = "odontologoId", source = "odontologo.idUsuario")
//    @Mapping(target = "odontologoNombre",
//            expression = "java(c.getOdontologo().getNombres() + \" \" + c.getOdontologo().getApellidos())")
//
//    // Tratamiento (solo uno, no colección)
//    @Mapping(target = "tratamientoId",
//            expression = "java(c.getTratamientos() != null ? c.getTratamientos().getId() : null)")
//    @Mapping(target = "tratamientoNombre",
//            expression = "java(c.getTratamientos() != null ? c.getTratamientos().getNombre() : null)")
//
//    // Fecha y hora
//    @Mapping(target = "fecha", expression = "java(c.getFecha().toString())")
//    @Mapping(target = "hora", expression = "java(c.getHora().toString())")
//
//    // Comentario
//    @Mapping(target = "comentario", source = "motivo")
//
//    CitaDTO toDto(Cita c);
//}

package com.odontoapp.mappers;

import com.odontoapp.dto.data.CitaDTO;
import com.odontoapp.entity.Cita;
import com.odontoapp.entity.Tratamiento;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CitaMapper {

    @Mapping(target = "id", source = "idCita")

    // Paciente
    @Mapping(target = "pacienteId", source = "paciente.idUsuario")
    @Mapping(target = "pacienteNombre",
            expression = "java(c.getPaciente().getNombres() + \" \" + c.getPaciente().getApellidos())")

    // Odontólogo
    @Mapping(target = "odontologoId", source = "odontologo.idUsuario")
    @Mapping(target = "odontologoNombre",
            expression = "java(c.getOdontologo().getNombres() + \" \" + c.getOdontologo().getApellidos())")

    // Tratamiento (primer elemento del Set)
    @Mapping(target = "tratamientoId",
            expression = "java(getPrimerTratamientoId(c))")
    @Mapping(target = "tratamientoNombre",
            expression = "java(getPrimerTratamientoNombre(c))")

    // Fecha/hora
    @Mapping(target = "fecha", expression = "java(c.getFecha().toString())")
    @Mapping(target = "hora", expression = "java(c.getHora().toString())")

    // Comentario
    @Mapping(target = "comentario", source = "motivo")
    CitaDTO toDto(Cita c);

    // -------- Helpers usados por MapStruct --------

    default Integer getPrimerTratamientoId(Cita c) {
        if (c.getTratamientos() == null || c.getTratamientos().isEmpty()) return null;
        Tratamiento t = c.getTratamientos().iterator().next();
        return t.getIdTratamiento();
    }

    default String getPrimerTratamientoNombre(Cita c) {
        if (c.getTratamientos() == null || c.getTratamientos().isEmpty()) return null;
        Tratamiento t = c.getTratamientos().iterator().next();
        return t.getNombre();
    }
}
