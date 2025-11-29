package com.odontoapp.mappers;

import org.mapstruct.Mapper;
import com.odontoapp.entity.Paciente;
import com.odontoapp.dto.user.PacienteDTO;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PacienteMapper {
    PacienteDTO toDto(Paciente entity);
    Paciente toEntity(PacienteDTO dto);
}

