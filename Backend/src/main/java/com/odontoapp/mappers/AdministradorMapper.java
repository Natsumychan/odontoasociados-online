package com.odontoapp.mappers;

import com.odontoapp.dto.user.AdministradorDTO;
import com.odontoapp.entity.Administrador;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AdministradorMapper {
    AdministradorDTO toDto(Administrador entity);
}
