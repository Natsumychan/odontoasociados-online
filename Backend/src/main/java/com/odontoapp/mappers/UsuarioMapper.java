package com.odontoapp.mappers;

import com.odontoapp.dto.user.UsuarioRequestDTO;
import com.odontoapp.dto.user.UsuarioResponseDTO;
import com.odontoapp.entity.Usuario;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UsuarioMapper {

    // ----------- REQUEST → ENTITY -----------
    @Mappings({
            @Mapping(source = "nombre", target = "nombres"),
            @Mapping(source = "apellido", target = "apellidos"),
            @Mapping(source = "email", target = "correo"),
            @Mapping(source = "documento", target = "documento"),
            @Mapping(source = "telefono", target = "telefono"),
            @Mapping(source = "password", target = "clave"),
            @Mapping(source = "rol", target = "rol")
    })
    Usuario toEntity(UsuarioRequestDTO dto);


    // ----------- ENTITY → RESPONSE -----------
    @Mappings({
            @Mapping(source = "idUsuario", target = "id"),
            @Mapping(source = "nombres", target = "nombre"),
            @Mapping(source = "apellidos", target = "apellido"),
            @Mapping(source = "correo", target = "email"),
            @Mapping(source = "telefono", target = "telefono"),
            @Mapping(source = "rol", target = "rol")
    })
    UsuarioResponseDTO toResponse(Usuario entity);


    // ----------- PATCH / UPDATE -----------
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mappings({
            @Mapping(source = "nombre", target = "nombres"),
            @Mapping(source = "apellido", target = "apellidos"),
            @Mapping(source = "email", target = "correo"),
            @Mapping(source = "documento", target = "documento"),
            @Mapping(source = "telefono", target = "telefono"),
            @Mapping(source = "password", target = "clave"),
            @Mapping(source = "rol", target = "rol")
    })
    void updateEntityFromDto(UsuarioRequestDTO dto, @MappingTarget Usuario entity);
}
