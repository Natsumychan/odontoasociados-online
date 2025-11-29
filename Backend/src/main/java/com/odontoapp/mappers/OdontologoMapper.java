package com.odontoapp.mappers;

import com.odontoapp.dto.user.OdontologoDTO;
import com.odontoapp.entity.Odontologo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = UsuarioMapper.class, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OdontologoMapper {

    OdontologoDTO toDto(Odontologo entity);

    Odontologo toEntity(OdontologoDTO dto);

    @Named("intToLong")
    default Long intToLong(Integer id) {
        return id == null ? null : id.longValue();
    }

    @Named("longToInt")
    default Integer longToInt(Long id) {
        return id == null ? null : id.intValue();
    }
}
