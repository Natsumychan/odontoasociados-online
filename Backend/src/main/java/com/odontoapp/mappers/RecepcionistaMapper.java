package com.odontoapp.mappers;

import com.odontoapp.dto.user.RecepcionistaDTO;
import com.odontoapp.entity.Recepcionista;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RecepcionistaMapper {

    @Mapping(target = "turno", expression = "java(entity.getTurno().name())")
    RecepcionistaDTO toDto(Recepcionista entity);

}
