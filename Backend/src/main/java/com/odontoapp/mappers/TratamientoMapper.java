package com.odontoapp.mappers;

import com.odontoapp.dto.data.TratamientoDTO;
import com.odontoapp.entity.Tratamiento;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TratamientoMapper {

    TratamientoMapper INSTANCE = Mappers.getMapper(TratamientoMapper.class);

    TratamientoDTO toDto(Tratamiento entity);
}